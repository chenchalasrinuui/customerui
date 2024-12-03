const regEx = {
    "REQUIRED": {
        pattern: /./,
        message: 'Required !!!'
    },
    "EMAIL": {
        pattern: /^[a-zA-Z]{1}[a-zA-Z0-9_./]*@[a-zA-Z]{3,10}\.[a-zA-Z]{2,3}$/,
        message: "Should be in the email format"
    },
    "MIN5CHAR": {
        pattern: /[a-zA-Z0-9]{5,}/,
        message: "Min 5 chars"
    },
    "PHONE": {
        pattern: /^[0-9]{10}$/,
        message: "Exactly 10 digits"
    },
    "RETYPEPWD": {
        message: "Password mismatch"
    },
    "IMAGEONLY": {
        message: "Please select image"
    },
    "IMGMAXSIZE5KB": {
        message: "Size is <6kb , widht <250 , height<250"
    },
    "EMAIL/PHONE": {
        pattern: [/^[a-zA-Z]{1}[a-zA-Z0-9_./]*@[a-zA-Z]{3,10}\.[a-zA-Z]{2,3}$/, /^[0-9]{10}$/],
        message: "Please Check your input"
    }
}

function getImgWidthAndHeight(file) {
    return new Promise((resolve, reject) => {

        const img = new Image();

        // Load the image file as a data URL
        img.src = URL.createObjectURL(file);

        // When the image loads, get its width and height
        img.onload = function () {
            const width = img.width;
            const height = img.height;
            resolve([width, height])
            // Release the object URL after use
            URL.revokeObjectURL(img.src);
        }
    })

}

function getFileInfo(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = function () {
            resolve(reader.result)
        }
        reader.onerror = function () {

        }
    })

}

async function validate(inputObj, inputControls, files) {
    inputObj.errorMsg = "";
    outerLoop: for (let val of inputObj?.criteria) {
        const { pattern, message } = regEx[val]
        switch (val) {
            case 'RETYPEPWD':
                const pwdObj = inputControls.find((obj) => obj.name === 'newPwd')
                const retypePwdObj = inputControls.find((obj) => obj.name === 'retypePwd')
                pwdObj.errorMsg = ""
                retypePwdObj.errorMsg = ""

                if (pwdObj?.value && retypePwdObj?.value && pwdObj?.value !== retypePwdObj?.value) {
                    inputObj.errorMsg = message
                    break outerLoop;
                }
                break;
            case 'IMAGEONLY':
                if (!files) return;
                const { type } = files?.[0]
                if (!type?.startsWith('image/')) {
                    inputObj.errorMsg = message
                    break outerLoop
                } else {
                    const fileData = await getFileInfo(files[0])
                    inputObj.src = fileData;
                }
                break;
            case 'IMGMAXSIZE5KB':
                if (!files) return;
                const { size } = files?.[0]
                const [width, height] = await getImgWidthAndHeight(files[0])
                if (!(size < 6150 && width < 250 && height < 250)) {
                    inputObj.errorMsg = message
                    break outerLoop;
                }
                break;
            case 'EMAIL/PHONE':
                const isValid = pattern[0].test(inputObj.value) || pattern[1].test(inputObj.value)
                if (!isValid) {
                    inputObj.errorMsg = message
                    break outerLoop;
                }
                break;
            default:

                if (!pattern.test(inputObj.type === 'file' ? inputObj.selFile : inputObj?.value)) {
                    inputObj.errorMsg = message
                    break outerLoop;
                }
        }
    }
}

export async function handleFieldLevelValidation(eve, inputControls, setInputControls) {
    const { name, value, type, files } = eve?.target
    // const clonedInputControls = JSON.parse(JSON.stringify(inputControls))
    const clonedInputControls = Object.assign([], inputControls)

    let inputObj = clonedInputControls.find((obj) => {
        return obj.name === name
    })
    if (type === 'file') {
        inputObj.selFile = files
    } else {
        inputObj.value = value;
    }
    await validate(inputObj, clonedInputControls, files)
    setInputControls(clonedInputControls)
}

export async function handleFormLevelValidation(inputControls, setInputControls, isEdit) {
    const clonedInputControls = Object.assign([], inputControls)

    //const clonedInputControls = JSON.parse(JSON.stringify(inputControls))
    const dataObj = {}

    await Promise.allSettled(
        clonedInputControls.map(async (obj) => {
            dataObj[obj.name] = obj.type === 'file' ? obj.selFile : obj.value;
            if (isEdit) {
                if (obj.type === 'file') {
                    dataObj.filePath = obj.value
                }
            }
            await validate(obj, clonedInputControls, obj.selFile);
        })
    );

    const isInValid = clonedInputControls.some((obj) => obj.errorMsg)
    setInputControls(clonedInputControls)

    return [isInValid, dataObj]
}

export function setFormData(inputControls, setInputControls, data, isEdit, fieldName) {
    const clonedInputControls = Object.assign([], inputControls)
    clonedInputControls.forEach((obj) => {
        if (isEdit && obj.name === fieldName) {
            obj.isDisabled = true
        }
        obj.value = data[obj.name]
    })
    setInputControls(clonedInputControls)
}


export function clearFormData(inputControls, setInputControls) {
    const clonedInputControls = JSON.parse(JSON.stringify(inputControls))
    clonedInputControls.forEach((obj) => {
        obj.value = ""
        if (obj.type === 'file') {
            obj.selFile = ""
            obj.src = ""
        }
    })
    setInputControls(clonedInputControls)
}