import json
import fileinput

subjectCodes = [
    "B.Tech-BT",
    "B.Tech-CE",
    "B.Tech-CH",
    "B.Tech-CS",
    "B.Tech-EC",
    "B.Tech-EE",
    "B.Tech-ME",
    "B.Tech-MM",
]
rankingCriteria = ["CGPA", "SGPA"]


def passedStudentsOnly():
    with open("_rawData.txt", "r", encoding="utf-8") as info:
        for line in info:
            x = line.split()
            passedStudentsFile = open("passedStudents.txt", "a")
            failedStudentsFile = open("failedStudents.txt", "a")
            listToStr = " ".join(map(str, x))
            if (
                listToStr.find("BACKLOG") != -1
                or listToStr.find("Backlog") != -1
                or listToStr.find("Supp") != -1
            ):
                failedStudentsFile.write(f"{listToStr}\n")
                failedStudentsFile.close()
                continue
            passedStudentsFile.write(f"{listToStr}\n")
            passedStudentsFile.close()



def generateAllResults(subjectInt, criteriaInt):
    if subjectInt < 0 or subjectInt > 8:
        print("Enter valid subject code")
        return
    if criteriaInt < 0 or criteriaInt > 1:
        print("Enter valid criteria code")
        return
    else:
        resultsDict = {}
        sortedList = []
        with open("passedStudents.txt", "r", encoding="utf-8") as info:
            if criteriaInt == 0:
                cry = -2
            else:
                cry = -3
            count = 0
            for line in info:
                x = line.split()
                if subjectCodes[subjectInt] == x[1]:
                    count += 1
                    # Find the index of "Passed" or "Withheld"
                    if "Passed" in x:
                        status_index = x.index("Passed")
                    elif "Withheld" in x:
                        status_index = x.index("Withheld")
                    else:
                        continue
                    x[status_index:] = [" ".join(x[status_index:])]
                    resultsDict[count] = x[1:]

        # Sorting according to CGPA or maybe SCGPA
        sortedList = sorted(
            resultsDict, key=lambda x: resultsDict[x][cry], reverse=True
        )


        for index, key in enumerate(sortedList):
            with open(
                f"Ranked-{subjectCodes[subjectInt]}-{rankingCriteria[criteriaInt]}-Sem8.txt",
                "a",
                encoding="utf-8",
            ) as f:
                listToStr = " ".join(map(str, resultsDict[key]))
                f.write(f"{listToStr}\n")

            with open(
                f"Ranked-{subjectCodes[subjectInt]}-{rankingCriteria[criteriaInt]}-Sem8.json",
                "a",
                encoding="utf-8",
            ) as js:
                jsonData = json.dumps(resultsDict[key], indent=4)
                if index == 0:
                    js.write("[\n")
                js.write(f"{jsonData}")
                if index != len(sortedList) - 1:
                    js.write(",\n")
                else:
                    js.write("\n]")

def generateOverallResult():
    overall_results_dict = {}
    with open("passedStudents.txt", "r", encoding="utf-8") as info:
        for line in info:
            x = line.split()
            if "Passed" in x:
                status_index = x.index("Passed")
                x[status_index:] = [" ".join(x[status_index:])]
                overall_results_dict[x[0]] = x[1:]

    sorted_list = sorted(overall_results_dict, key=lambda x: overall_results_dict[x][-2], reverse=True)

    with open("OverallResult-CGPA.txt", "a", encoding="utf-8") as f:
        for key in sorted_list:
            list_to_str = " ".join(map(str, overall_results_dict[key]))
            f.write(f"{list_to_str}\n")

    with open("OverallResult-CGPA.json", "a", encoding="utf-8") as js:
        js.write("[\n")
        for index, key in enumerate(sorted_list):
            json_data = json.dumps(overall_results_dict[key], indent=4)
            js.write(f"{json_data}")
            if index != len(sorted_list) - 1:
                js.write(",\n")
            else:
                js.write("\n]")

def gen():
    for subject_code in range(len(subjectCodes)):
        for criteria_code in range(len(rankingCriteria)):
            print(
                f"\n\nProcessing for Subject: {subjectCodes[subject_code]} and Criteria: {rankingCriteria[criteria_code]}\n"
            )
            generateAllResults(subject_code, criteria_code)
            print(
                f"Completed processing for Subject: {subjectCodes[subject_code]} and Criteria: {rankingCriteria[criteria_code]}\n\n"
            )


if __name__ == "__main__":
    # passedStudentsOnly()
    # gen()
    generateOverallResult()
    print("All files generated successfully")
