let data = null;

function numericSuffix(n) {
    const mod100 = n % 100;
    if (mod100 >= 11 && mod100 <= 13) {
        return `${n}th`;
    }
    const mod10 = n % 10;
    switch (mod10) {
        case 1: return `${n}st`;
        case 2: return `${n}nd`;
        case 3: return `${n}rd`;
        default: return `${n}th`;
    }
}

function updateTablesForConvention(convention) {
    if(!data) {
        console.warn("Data not loaded yet.");
        return;
    }

    const { integer_parameters, floating_parameters, all_integer_registers, all_floating_registers } = data[convention]['registers'];

    const integerTable = document.getElementById("integer-parameters-body");
    const floatingTable = document.getElementById("floating-parameters-body");
    const totalIntegerTable = document.getElementById("all-integer-registers-body");
    const totalFloatingTable = document.getElementById("all-floating-registers-body");

    [integerTable, floatingTable, totalIntegerTable, totalFloatingTable].forEach(table => {
        table.innerHTML = '';
    });

    const createCell = (row, content, isHeader = false) => {
        const cell = isHeader ? document.createElement('th') : document.createElement('td');
        cell.textContent = content || 'N/A';
        row.appendChild(cell);
        return cell;
    }

    const createFilledRow = (table, cell, size) => {
        const row = table.insertRow();
        const filledCell = row.insertCell();
        filledCell.colSpan = size;
        filledCell.classList.add("align-center");
        filledCell.textContent = cell;
        return row;
    }

    integer_parameters.forEach((reg, idx) => {
        const row = integerTable.insertRow();
        createCell(row, idx === 0 ? "Return" : `${numericSuffix(idx)} Parameter`, true);
        createCell(row, reg.low8);
        createCell(row, reg.high8);
        createCell(row, reg.bit16);
        createCell(row, reg.bit32);
        createCell(row, reg.bit64);
    });

    createFilledRow(integerTable, "Additional parameters are passed on the stack", 6);

    floating_parameters.forEach((reg, idx) => {
        const row = floatingTable.insertRow();
        createCell(row, idx === 0 ? "Return" : `${numericSuffix(idx)} Parameter`, true);
        createCell(row, reg.bit128);
        createCell(row, reg.bit256);
        createCell(row, reg.bit512);
    });

    createFilledRow(floatingTable, "Additional parameters are passed on the stack", 4);

    all_integer_registers.forEach(reg => {
        const row = totalIntegerTable.insertRow();
        createCell(row, reg.volatile ? "Volatile" : "Non-volatile", true);
        createCell(row, reg.low8);
        createCell(row, reg.high8);
        createCell(row, reg.bit16);
        createCell(row, reg.bit32);
        createCell(row, reg.bit64);
    });

    all_floating_registers.forEach(reg => {
        const row = totalFloatingTable.insertRow();
        createCell(row, reg.volatile ? "Volatile" : "Non-volatile", true);
        createCell(row, reg.bit128);
        createCell(row, reg.bit256);
        createCell(row, reg.bit512);
    });
}

async function loadData() {
    try {
        const response = await fetch("assets/registers.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        data = await response.json();
        updateTablesForConvention('x64');
    } catch (error) {
        console.error("Error loading data:", error);
        alert("Failed to load register data. Please try again later.");
    }
}

function onCallingConventionChange(event) {
    const selectedValue = event.target.value;
    console.log("Calling convention changed to:", selectedValue);
    updateTablesForConvention(selectedValue);
}

function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    // Show/hide button based on scroll position
    function toggleBackToTopVisibility() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }
    
    // Smooth scroll to top
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Event listeners
    window.addEventListener('scroll', toggleBackToTopVisibility);
    backToTopButton.addEventListener('click', scrollToTop);
    
    // Initial check
    toggleBackToTopVisibility();
}


window.addEventListener("DOMContentLoaded", async () => {
    await loadData();

    console.log(data);

    document.querySelectorAll('input[name="calling-convention"]').forEach(radio => {
        radio.addEventListener("change", onCallingConventionChange);
    });

    const defaultRadio = document.querySelector('input[name="calling-convention"]:checked');
    if (defaultRadio) {
        updateTablesForConvention(defaultRadio.value);
    }
    
    // Initialize back to top functionality
    initBackToTop();
});