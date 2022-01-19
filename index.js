class CustomWorkout {
    constructor(exerciseArray) {
        if (exerciseArray) {
            this.exerciseArray = exerciseArray;
        } else {
            this.exerciseArray = [];
        }

        this.exerciseListElement = document.getElementById('exerciseList');

        this.setExerciseListElement(this.getExerciseArray());
        this.appendNewExerciseFormToList(this.exerciseListElement);
    }

    appendNewExerciseFormToList(domListElement) {
        if (domListElement)
            domListElement.innerHTML += `
        <li class="exerciseListItem">
            
                <ul class="formContainer">
                    <li>
                        <input type="text" id="newExerciseInput" class="w100" placeholder=""></input>
                    </li>
                    <li>
                        <label for="durationInput">Duration</label>
                        <input type="number" id="durationInput" class="durationInput" value="30"></input>
                        <select name="durationMinutesOrSeconds" id="durationMinutesOrSecondsSelect">
                            <option value="seconds">seconds</option>
                            <option value="minutes">minutes</option>
                        </select>
                    </li>
                    <li>
                        <label for="restDurationInput">Rest</label>
                        <input type="number" id="restDurationInput" class="durationInput" value="30"></input>
                        <select name="restDurationMinutesOrSeconds" id="restDurationMinutesOrSeconds">
                            <option value="seconds">seconds</option>
                            <option value="minutes">minutes</option>
                        </select>
                    </li>
                    <li>
                        <button type="submit" id="btnAddExercise">Add</button>
                    </li>
                </ul>
            
        </li>
        `;

        const addButtonElement = document.getElementById('btnAddExercise');
        const newExerciseInputElement = document.getElementById('newExerciseInput');
        const durationInputElement = document.getElementById('durationInput');
        const durationMinutesOrSecondsSelectElement = document.getElementById('durationMinutesOrSecondsSelect');
        addButtonElement.addEventListener('click', () => this.btnClickAddExercise({ newExerciseInputElement, durationInputElement, durationMinutesOrSecondsSelectElement }));
    }

    btnClickAddExercise({ newExerciseInputElement, durationInputElement, durationMinutesOrSecondsSelectElement }) {
        console.log({
            date: new Date().toLocaleTimeString(),
            newExerciseInputElement: newExerciseInputElement.value,
            durationInputElement: durationInputElement.value,
            durationMinutesOrSecondsSelectElement: durationMinutesOrSecondsSelectElement.value,
        });

        // TODO: input error checking.  null values, duration must be number, etc.

        var newExerciseDurationInSeconds = durationInputElement.value;
        if (durationMinutesOrSecondsSelectElement.value == 'minutes') newExerciseDurationInSeconds *= 60;

        // add exercise to array
        this.exerciseArray.push({ name: newExerciseInputElement.value, duration: newExerciseDurationInSeconds, isActive: true });

        // repaint list element
        this.setExerciseListElement(this.exerciseArray);
        this.appendNewExerciseFormToList(this.exerciseListElement);
    }

    getExerciseArray() {
        return this.exerciseArray;
    }

    // Returns human-readable time format given a number of seconds (ex 90 returns 1m30s)
    getFormattedTimeString(seconds) {
        if (seconds < 60) {
            return seconds + 's';
        } else {
            const minutes = parseInt(seconds / 60);
            const sec = seconds % 60;
            // return ('0' + minutes).slice(-2) + ':' + ('0' + sec).slice(-2);
            if (sec > 0) {
                return minutes + 'm' + sec + 's';
            } else {
                return minutes + 'm';
            }
        }
    }

    // Add items from array as list items to ordered list
    setExerciseListElement(exerciseArray) {
        if (this.exerciseListElement) {
            this.exerciseListElement.innerHTML = null;

            for (var exerciseArrayIndex = 0; exerciseArrayIndex < exerciseArray.length; exerciseArrayIndex++) {
                if (exerciseArray[exerciseArrayIndex].isActive == true) {
                    const li = document.createElement('li');
                    li.className = 'exerciseListItem';
                    const text = document.createTextNode(`${exerciseArray[exerciseArrayIndex].name} (${this.getFormattedTimeString(exerciseArray[exerciseArrayIndex].duration)})`);
                    li.appendChild(text);

                    // Is the next item in the array a rest period? Add it as an intented item
                    if (exerciseArray[exerciseArrayIndex + 1]?.isActive == false) {
                        const restUl = document.createElement('ul');
                        const restLi = document.createElement('li');
                        restLi.className = 'exerciseListItem';
                        const restText = document.createTextNode(`${exerciseArray[exerciseArrayIndex + 1].name} (${this.getFormattedTimeString(exerciseArray[exerciseArrayIndex + 1].duration)})`);
                        restLi.appendChild(restText);
                        restUl.appendChild(restLi);
                        li.appendChild(restUl);
                    }

                    this.exerciseListElement.appendChild(li);
                }
            }
        }
    }
}

const testExerciseArray = [
    { name: 'Dumbbell Clean & Press', duration: 30, isActive: true },
    { name: 'Rest', duration: 30, isActive: false },
    { name: 'Dumbbell Deadlift', duration: 30, isActive: true },
    { name: 'Rest', duration: 30, isActive: false },
    { name: 'Renegade Rows', duration: 30, isActive: true },
    { name: 'Rest', duration: 30, isActive: false },
    { name: 'Overhead Squats', duration: 30, isActive: true },
    { name: 'Rest', duration: 30, isActive: false },
    { name: 'Lunging Bicep Press', duration: 30, isActive: true },
    { name: 'Rest', duration: 30, isActive: false },
    { name: 'Arnold Press', duration: 30, isActive: true },
    { name: 'Rest', duration: 30, isActive: false },
    { name: 'Goblet Squats', duration: 30, isActive: true },
];

new CustomWorkout(testExerciseArray);
