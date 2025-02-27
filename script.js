function setNativeValue(element, value) {
    let lastValue = element.value;
    element.value = value;
    
    let event = new Event('input', { bubbles: true });
    let tracker = element._valueTracker;
    
    if (tracker) {
        tracker.setValue(lastValue);
    }
    
    element.dispatchEvent(event);
}

async function autoClicker(iterations = 10) {
    for (let i = 0; i < iterations; i++) {
        console.log(`Iteration: ${i + 1}`);

        let inputField = document.querySelector('._tokenQuantityInput_ispvp_37#swap_sell_qty');
        while (!inputField) {
            await new Promise(resolve => setTimeout(resolve, 500));
            inputField = document.querySelector('._tokenQuantityInput_ispvp_37#swap_sell_qty');
        }

// Menghasilkan angka random antara 0.010 dan 0.090 dengan 3 desimal
let randomValue = (Math.random() * 0.08 + 0.01).toFixed(3);
setNativeValue(inputField, randomValue);
console.log(`Value set: ${randomValue}`);

        let buyInputField = document.querySelector('._tokenQuantityInput_ispvp_37#swap_buy_qty');
        while (!buyInputField || !buyInputField.value) {
            await new Promise(resolve => setTimeout(resolve, 500));
            buyInputField = document.querySelector('._tokenQuantityInput_ispvp_37#swap_buy_qty');
        }

        let confirmButton = document.querySelector('#confirm_swap_button');
        while (!confirmButton) {
            await new Promise(resolve => setTimeout(resolve, 500));
            confirmButton = document.querySelector('#confirm_swap_button');
        }
        confirmButton.click();

        let skipConfirmButton = document.querySelector('#set_skip_confirmation_button');
        while (!skipConfirmButton) {
            await new Promise(resolve => setTimeout(resolve, 500));
            skipConfirmButton = document.querySelector('#set_skip_confirmation_button');
        }
        skipConfirmButton.click();

        await new Promise(resolve => {
            let checkInterval = setInterval(() => {
                let confirmationElement = document.querySelector('._circle_completed_avq9e_13');
                if (confirmationElement) {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 500);
        });

        let warningBox;
        do {
            warningBox = document.querySelector('._warning_box_190mb_1');
            if (warningBox) {
                let acceptButton = warningBox.querySelector('button');
                if (acceptButton && acceptButton.innerText.includes("Accept")) {
                    acceptButton.click();
                    console.log("Warning accepted");
                }
            }
            await new Promise(resolve => setTimeout(resolve, 500));
        } while (warningBox);

        let modalGlobal = document.querySelector('#Modal_Global');
        while (!modalGlobal) {
            await new Promise(resolve => setTimeout(resolve, 500));
            modalGlobal = document.querySelector('#Modal_Global');
        }
        modalGlobal.click();

        await new Promise(resolve => setTimeout(resolve, 2000));
    }
    console.log("Auto clicker selesai");
}

// Jalankan script dengan 10 iterasi (bisa diubah)
autoClicker(10);
