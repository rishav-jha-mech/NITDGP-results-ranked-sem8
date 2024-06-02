import json
import fileinput

subjectCodes = ["BT", "CE", "CH", "CS", "EC", "EE", "ME", "MM"]
rankingCriteria = ["CGPA", "SGPA"]


def passedStudentsOnly():
    with open("_rawData.txt", "r", encoding="utf-8") as info:
        for line in info:
            x = line.split()
            if x[-1] != "Passed":
                f = open("failed.txt", "a")
                listToStr = " ".join(map(str, x))
                f.write(f"{listToStr}\n")
                f.close()
                continue
            f = open("passedStudents.txt", "a")
            listToStr = " ".join(map(str, x))
            f.write(f"{listToStr}\n")
            f.close()


def generateAllResults(subjectInt, criteriaInt):
    if subjectInt < 0 or subjectInt > 8:
        print("Enter valid subject code")
        return
    if criteriaInt < 0 or criteriaInt > 1:
        print("Enter valid criteria code")
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
                if subjectCodes[subjectInt] == x[0]:
                    count += 1
                    resultsDict[count] = x[0:]

        # Sorting according to CGPA or maybe SCGPA
        sortedList = sorted(
            resultsDict, key=lambda x: resultsDict[x][cry], reverse=True
        )


        for index, key in enumerate(sortedList):
            with open(
                f"Ranked-{subjectCodes[subjectInt]}-{rankingCriteria[criteriaInt]}-Sem7.txt",
                "a",
                encoding="utf-8",
            ) as f:
                listToStr = " ".join(map(str, resultsDict[key]))
                f.write(f"{listToStr}\n")

            with open(
                f"Ranked-{subjectCodes[subjectInt]}-{rankingCriteria[criteriaInt]}-Sem7.json",
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
    passedStudentsOnly()
    # gen()
    print("All files generated successfully")