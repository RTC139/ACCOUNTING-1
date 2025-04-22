document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers for the "Add" buttons
    document.querySelectorAll('.add-button').forEach(button => {
        button.addEventListener('click', function() {
            // Find the closest section to determine if we're adding income or expense
            const section = this.closest('.calculator-section');
            const isIncome = section === document.querySelector('.calculator-section:first-child');
            
            // Get all inputs in this section
            const inputs = section.querySelectorAll('input');
            
            // Get the values from both columns
            const typeInputs = [inputs[0], inputs[1]]; // First row, both columns
            const amountInputs = [inputs[2], inputs[3]]; // Second row, both columns
            
            // Check if both columns have values
            const leftValid = typeInputs[0].value.trim() && amountInputs[0].value.trim() && !isNaN(parseFloat(amountInputs[0].value));
            const rightValid = typeInputs[1].value.trim() && amountInputs[1].value.trim() && !isNaN(parseFloat(amountInputs[1].value));
            
            // Determine which info square to update
            const targetSquare = isIncome ? 
                document.querySelector('.left-square') : 
                document.querySelector('.right-square');
            
            let entriesAdded = 0;
            
            // Add left column entry if valid
            if (leftValid) {
                const type = typeInputs[0].value.trim();
                const amount = amountInputs[0].value.trim();
                
                // Create a new entry
                const entry = document.createElement('div');
                entry.className = 'info-entry';
                entry.innerHTML = `
                    <span class="entry-type">${type}:</span>
                    <span class="entry-amount">₱${parseFloat(amount).toFixed(2)}</span>
                `;
                
                // Add the entry to the target square
                targetSquare.appendChild(entry);
                
                // Clear the inputs
                typeInputs[0].value = '';
                amountInputs[0].value = '';
                
                entriesAdded++;
            }
            
            // Add right column entry if valid
            if (rightValid) {
                const type = typeInputs[1].value.trim();
                const amount = amountInputs[1].value.trim();
                
                // Create a new entry
                const entry = document.createElement('div');
                entry.className = 'info-entry';
                entry.innerHTML = `
                    <span class="entry-type">${type}:</span>
                    <span class="entry-amount">₱${parseFloat(amount).toFixed(2)}</span>
                `;
                
                // Add the entry to the target square
                targetSquare.appendChild(entry);
                
                // Clear the inputs
                typeInputs[1].value = '';
                amountInputs[1].value = '';
                
                entriesAdded++;
            }
            
            // Show message if nothing was added
            if (entriesAdded === 0) {
                alert('Please enter both a valid name and amount in at least one column.');
            } else {
                // Focus back on the first type input for the next entry
                typeInputs[0].focus();
            }
        });
    });
    
    // Calculate button functionality
    document.getElementById('calculate').addEventListener('click', function() {
        // Get all income amounts from the left info square
        const incomeAmounts = Array.from(document.querySelectorAll('.left-square .info-entry'))
            .map(entry => parseFloat(entry.querySelector('.entry-amount').textContent.replace('₱', '')) || 0);
        
        // Get all expense amounts from the right info square
        const expenseAmounts = Array.from(document.querySelectorAll('.right-square .info-entry'))
            .map(entry => parseFloat(entry.querySelector('.entry-amount').textContent.replace('₱', '')) || 0);
        
        // Calculate total income and expenses
        const totalIncome = incomeAmounts.reduce((sum, amount) => sum + amount, 0);
        const totalExpenses = expenseAmounts.reduce((sum, amount) => sum + amount, 0);
        
        // Calculate monthly net income
        const monthlyNet = totalIncome - totalExpenses;
        
        // Get values from period inputs
        const monthsInput = document.querySelectorAll('.period-input')[0];
        const yearsInput = document.querySelectorAll('.period-input')[1];
        
        // Update monthly result
        document.getElementById('monthly-result').textContent = formatCurrency(monthlyNet);
        
        // Only calculate months if there's a value
        if (monthsInput && monthsInput.value && monthsInput.value.trim() !== '') {
            const months = parseInt(monthsInput.value);
            const xMonthsNet = monthlyNet * months;
            document.getElementById('months-result').textContent = formatCurrency(xMonthsNet);
        } else {
            document.getElementById('months-result').textContent = "__________";
        }
        
        // Only calculate years if there's a value
        if (yearsInput && yearsInput.value && yearsInput.value.trim() !== '') {
            const years = parseInt(yearsInput.value);
            const xYearsNet = monthlyNet * (years * 12);
            document.getElementById('years-result').textContent = formatCurrency(xYearsNet);
        } else {
            document.getElementById('years-result').textContent = "__________";
        }
    });
    
    // Return button functionality
    document.querySelector('.return-button button').addEventListener('click', function() {
        // Reset all input fields
        document.querySelectorAll('.calculator-section input').forEach(input => {
            input.value = '';
        });
        
        // Reset period input fields
        document.querySelectorAll('.period-input').forEach(input => {
            input.value = '';
        });
        
        // Clear the info squares (but keep the headers)
        const leftSquare = document.querySelector('.left-square');
        const rightSquare = document.querySelector('.right-square');
        
        if (leftSquare) {
            leftSquare.innerHTML = '<h3>Incomes</h3>';
        }
        
        if (rightSquare) {
            rightSquare.innerHTML = '<h3>Expenses</h3>';
        }
        
        // Reset calculation results
        document.getElementById('monthly-result').textContent = "__________";
        document.getElementById('months-result').textContent = "__________";
        document.getElementById('years-result').textContent = "__________";
        
        // Optional: Show confirmation message
        alert('All entries have been reset!');
        
        // Focus on the first input field to start over
        const firstInput = document.querySelector('.calculator-section:first-child input');
        if (firstInput) {
            firstInput.focus();
        }
    });
    
    // Helper function to format currency
    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', { 
            style: 'currency', 
            currency: 'PHP',
            currencyDisplay: 'symbol',
            minimumFractionDigits: 2
        }).format(amount).replace(/PHP/, '₱');
    }
    
    // Add some styling for the info entries
    const style = document.createElement('style');
    style.textContent = `
        .info-entry {
            display: flex;
            justify-content: space-between;
            padding: 5px 10px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
        }
        .entry-type {
            font-weight: bold;
        }
        .info-square {
            padding: 15px;
            overflow-y: auto;
            max-height: 200px;
        }
        .left-square h3, .entry-type {
            color: #98fb98; /* Light green for income */
        }
        .right-square h3, .right-square .entry-type {
            color: #ffcccb; /* Light red for expenses */
        }
    `;
    document.head.appendChild(style);
    
    // Add headers to the info squares
    const leftSquare = document.querySelector('.left-square');
    const rightSquare = document.querySelector('.right-square');
    
    if (leftSquare && leftSquare.children.length === 0) {
        leftSquare.innerHTML = '<h3>Incomes</h3>';
    }
    
    if (rightSquare && rightSquare.children.length === 0) {
        rightSquare.innerHTML = '<h3>Expenses</h3>';
    }
});