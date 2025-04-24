document.addEventListener('DOMContentLoaded', function() {
    // Initialize all dropdowns and buttons when the page loads
    initializeAllFunctionality(document);
    
    // Setup reset button
    const resetButton = document.querySelector('.redo-btn');
    if (resetButton) {
        resetButton.addEventListener('click', resetPageState);
    }
    
    // Calculate button functionality
    document.getElementById('calculate')?.addEventListener('click', function() {
        // Get both sections
        const incomeSection = document.querySelector('.income-section');
        const expensesSection = document.querySelector('.expenses-section');
        
        // Calculate total income
        let totalIncome = 0;
        if (incomeSection && incomeSection.entries && incomeSection.entries.length > 0) {
            incomeSection.entries.forEach(entry => {
                // Extract numeric value from entry
                const value = parseFloat(entry.value.replace(/[^\d.-]/g, ''));
                if (!isNaN(value)) {
                    totalIncome += value;
                }
            });
        }
        
        // Calculate total expenses
        let totalExpenses = 0;
        if (expensesSection && expensesSection.entries && expensesSection.entries.length > 0) {
            expensesSection.entries.forEach(entry => {
                // Extract numeric value from entry
                const value = parseFloat(entry.value.replace(/[^\d.-]/g, ''));
                if (!isNaN(value)) {
                    totalExpenses += value;
                }
            });
        }
        
        // Calculate net income
        const netIncome = totalIncome - totalExpenses;
        
        // Display monthly result with 2 decimal places
        document.getElementById('monthly-result').textContent = '₱' + netIncome.toFixed(2);
        
        // Calculate and display for custom months
        const monthsInput = document.querySelector('.result-group:nth-child(2) .period-input');
        const monthsValue = parseInt(monthsInput.value);
        
        if (!isNaN(monthsValue) && monthsValue > 0) {
            const monthsResult = netIncome * monthsValue;
            document.getElementById('months-result').textContent = '₱' + monthsResult.toFixed(2);
        } else {
            document.getElementById('months-result').textContent = '___________';
        }
        
        // Calculate and display for custom years
        const yearsInput = document.querySelector('.result-group:nth-child(3) .period-input');
        const yearsValue = parseInt(yearsInput.value);
        
        if (!isNaN(yearsValue) && yearsValue > 0) {
            const yearsResult = netIncome * yearsValue * 12; // 12 months per year
            document.getElementById('years-result').textContent = '₱' + yearsResult.toFixed(2);
        } else {
            document.getElementById('years-result').textContent = '___________';
        }
        
        // Add animation effect to results
        const resultValues = document.querySelectorAll('.result-value');
        resultValues.forEach(value => {
            value.classList.add('calculated');
            setTimeout(() => {
                value.classList.remove('calculated');
            }, 1000);
        });
    });
    
    // Add event listeners to period inputs to recalculate on change
    document.querySelectorAll('.period-input').forEach(input => {
        input.addEventListener('input', function() {
            // Trigger calculation when inputs change
            const calculateButton = document.getElementById('calculate');
            if (calculateButton) calculateButton.click();
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.input-wrapper')) {
            document.querySelectorAll('.input-dropdown.active').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // Helper function to initialize all functionality
    function initializeAllFunctionality(container) {
        // Initialize dropdowns
        initializeDropdowns(container);
        
        // Initialize combined buttons
        initializeCombinedButtons(container);
    }
    
    // Helper function to initialize all dropdown functionality
    function initializeDropdowns(container) {
        // Input button click handlers
        container.querySelectorAll('.input-button').forEach(button => {
            // Remove any existing click listeners to prevent duplicates
            button.removeEventListener('click', inputButtonClickHandler);
            button.addEventListener('click', inputButtonClickHandler);
        });
        
        // Add button functionality
        container.querySelectorAll('.dropdown-add').forEach(button => {
            // Remove any existing click listeners to prevent duplicates
            button.removeEventListener('click', dropdownAddClickHandler);
            button.addEventListener('click', dropdownAddClickHandler);
        });
        
        // Remove button functionality
        container.querySelectorAll('.dropdown-remove').forEach(button => {
            // Remove any existing click listeners to prevent duplicates
            button.removeEventListener('click', dropdownRemoveClickHandler);
            button.addEventListener('click', dropdownRemoveClickHandler);
        });
    }
    
    // Helper function to initialize combined buttons
    function initializeCombinedButtons(container) {
        container.querySelectorAll('.combined-btn').forEach(button => {
            // Remove any existing click listeners to prevent duplicates
            button.removeEventListener('click', combinedBtnClickHandler);
            button.addEventListener('click', combinedBtnClickHandler);
        });
    }
    
    // Define handlers as separate functions for easier removal
    function inputButtonClickHandler(e) {
        e.stopPropagation(); // Prevent click from bubbling up
        const dropdown = this.parentElement.querySelector('.input-dropdown');
        
        // Close all other open dropdowns
        document.querySelectorAll('.input-dropdown.active').forEach(active => {
            if (active !== dropdown) {
                active.classList.remove('active');
            }
        });
        
        // Toggle this dropdown
        dropdown.classList.toggle('active');
    }
    
    function dropdownAddClickHandler() {
        const dropdown = this.closest('.input-dropdown');
        
        const newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.className = 'dropdown-input';
        newInput.placeholder = 'Enter value...';
        
        const buttonsContainer = this.closest('.dropdown-buttons');
        dropdown.insertBefore(newInput, buttonsContainer);
    }
    
    function dropdownRemoveClickHandler() {
        const dropdown = this.closest('.input-dropdown');
        const inputs = dropdown.querySelectorAll('.dropdown-input');
        
        if (inputs.length > 1) {
            inputs[inputs.length - 1].remove();
        }
    }
    
    function combinedBtnClickHandler() {
        const section = this.closest('.section');
        
        // Store entries for this section if not already present
        if (!section.entries) {
            section.entries = [];
        }
        
        // First perform the Add functionality
        const inputWrappers = section.querySelectorAll('.input-wrapper');
        
        if (inputWrappers.length >= 2) {
            const sourceInputs = inputWrappers[0].querySelectorAll('.dropdown-input');
            const amountInputs = inputWrappers[1].querySelectorAll('.dropdown-input');
            
            for (let i = 0; i < Math.min(sourceInputs.length, amountInputs.length); i++) {
                if (sourceInputs[i].value && amountInputs[i].value) {
                    // Format value to always have 2 decimal places
                    let rawValue = amountInputs[i].value.replace(/[^\d.-]/g, '');
                    let numValue = parseFloat(rawValue);
                    let formattedValue = !isNaN(numValue) ? numValue.toFixed(2) : "0.00";
                    
                    section.entries.push({
                        name: sourceInputs[i].value,
                        value: formattedValue,
                        isSource: true
                    });
                    
                    // Clear the inputs after adding
                    sourceInputs[i].value = '';
                    amountInputs[i].value = '';
                }
            }
        }
        
        // Then perform the View functionality
        // Store original content before replacing
        section.setAttribute('data-original-content', section.innerHTML);
        
        // Create detail view content with styled entry containers
        const detailContent = `
            <div class="detail-entries">
                ${section.entries.length > 0 ? 
                    section.entries.map(item => 
                        `<div class="entry-container">
                            <div class="entry-item">
                                <span class="source-entry">${item.name}</span>:₱${item.value}
                            </div>
                        </div>`
                    ).join('') : 
                    '<div class="no-entries">No entries found</div>'}
            </div>
            <button class="return-button">Return</button>
        `;
        
        // Replace section content
        section.innerHTML = detailContent;
        
        // Add return button functionality
        section.querySelector('.return-button').addEventListener('click', function() {
            // Restore original content
            section.innerHTML = section.getAttribute('data-original-content');
            
            // Re-attach ALL event listeners to the restored elements
            initializeAllFunctionality(section);
        });
    }
    
    // Page reset function
    function resetPageState() {
        // 1. Reset all input fields
        document.querySelectorAll('.dropdown-input').forEach(input => {
            input.value = '';
        });
        
        // 2. Reset period inputs
        document.querySelectorAll('.period-input').forEach(input => {
            input.value = '';
        });
        
        // 3. Clear stored entries in both sections
        const incomeSection = document.querySelector('.income-section');
        const expensesSection = document.querySelector('.expenses-section');
        
        if (incomeSection) incomeSection.entries = [];
        if (expensesSection) expensesSection.entries = [];
        
        // 4. Reset calculation results
        document.querySelectorAll('.result-value').forEach(result => {
            result.textContent = '___________';
        });
        
        // 5. Close any open dropdowns
        document.querySelectorAll('.input-dropdown.active').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
        
        // 6. Reset any views back to input state
        document.querySelectorAll('.section').forEach(section => {
            // Check if section is in view mode (has return button)
            if (section.querySelector('.return-button')) {
                // Get original content
                const originalContent = section.getAttribute('data-original-content');
                if (originalContent) {
                    section.innerHTML = originalContent;
                    
                    // Re-attach event listeners
                    initializeAllFunctionality(section);
                }
            }
        });
        
        // 7. Re-initialize all functionality after reset
        initializeAllFunctionality(document);
        
        // 8. Show confirmation message
        const confirmMessage = document.createElement('div');
        confirmMessage.className = 'reset-confirmation';
        confirmMessage.textContent = 'All entries reset!';
        confirmMessage.style.position = 'fixed';
        confirmMessage.style.top = '20px';
        confirmMessage.style.left = '50%';
        confirmMessage.style.transform = 'translateX(-50%)';
        confirmMessage.style.backgroundColor = '#4ADE80';
        confirmMessage.style.color = 'black';
        confirmMessage.style.padding = '10px 20px';
        confirmMessage.style.borderRadius = '20px';
        confirmMessage.style.fontWeight = 'bold';
        confirmMessage.style.zIndex = '1000';
        
        document.body.appendChild(confirmMessage);
        
        // Remove message after 2 seconds
        setTimeout(() => {
            confirmMessage.style.opacity = '0';
            confirmMessage.style.transition = 'opacity 0.5s';
            setTimeout(() => {
                document.body.removeChild(confirmMessage);
            }, 500);
        }, 1500);
    }
});