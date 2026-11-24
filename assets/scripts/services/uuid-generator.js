const list = document.getElementById('uuidList');

const MIN_ENTRIES = 1
const MAX_ENTRIES = 500

// EXPOSED FUNCTIONS
window.generateUUIDs = generateUUIDs;
window.copyUUID = copyUUID;
window.copyAll = copyAll;

let uuids = [];

function generateUUIDs() {
    const quantity = parseInt(
        document.getElementById('quantity').value
    );
    // Limit user input
    if (!Number.isInteger(quantity) ||
        quantity < MIN_ENTRIES || MAX_ENTRIES > 500) {
        return;
    }

    uuids = [];

    for (let i = 0; i < quantity; i++) {
        uuids.push(crypto.randomUUID());
    }

    document.getElementById('total').textContent = uuids.length;
    document.getElementById('copyAllBtn').disabled = false;

    
    list.innerHTML = '';

    uuids.forEach((uuid, index) => {
        const item = document.createElement('div');

        item.className =
            'input-group mb-2';

        const number = document.createElement('span');
        number.className = 'input-group-text';
        number.textContent = index + 1;

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'form-control font-monospace';
        input.value = uuid;
        input.readOnly = true;

        const button = document.createElement('button');
        button.className = 'btn btn-outline-primary';
        button.innerHTML = '<i class="bi bi-copy"></i>';

        button.addEventListener('click', () => {
            copyUUID(uuid, button);
        });

        item.append(number, input, button);
        list.appendChild(item);
    });
}

async function copyUUID(uuid, button) {
    try {
        await navigator.clipboard.writeText(uuid);

        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.classList.replace(
            'btn-outline-primary',
            'btn-success'
        );

        setTimeout(() => {
            button.textContent = originalText;
            button.classList.replace(
                'btn-success',
                'btn-outline-primary'
            );
        }, 1200);

    } catch (error) {
        console.log('Unable to copy UUID.');
    }
}

async function copyAll() {
    try {
        await navigator.clipboard.writeText(uuids.join('\n'));
    } catch (error) {
        console.log('Unable to copy ALL');
    }
}


generateUUIDs();