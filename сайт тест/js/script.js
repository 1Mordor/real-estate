// Main JavaScript for Real Estate Website
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dubai Real Estate website loaded successfully!');
    
    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
    
    // Property card interactions
    const propertyCards = document.querySelectorAll('.property-card');
    propertyCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('property-action')) {
                const propertyTitle = this.querySelector('.property-title').textContent;
                console.log('Viewing property:', propertyTitle);
                // Here you would typically redirect to property details page
                alert(`Подробная информация о: ${propertyTitle}`);
            }
        });
    });
    
    // Property action buttons
    const propertyActions = document.querySelectorAll('.property-action');
    propertyActions.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.property-card');
            const propertyTitle = card.querySelector('.property-title').textContent;
            const propertyPrice = card.querySelector('.property-price').textContent;
            
            console.log('Interested in property:', propertyTitle, propertyPrice);
            alert(`Запрос на объект: ${propertyTitle}\nЦена: ${propertyPrice}`);
        });
    });
    
    // Header actions
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent;
            switch(action) {
                case '💬':
                    alert('Открыть чат с консультантом');
                    break;
                case '🔔':
                    alert('Уведомления');
                    break;
                case '👤':
                    alert('Личный кабинет');
                    break;
            }
        });
    });
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.textContent;
            console.log('Navigation to:', section);
            alert(`Раздел "${section}" - в разработке`);
        });
    });
});

function handleSearch() {
    const type = document.querySelector('.search-select').value;
    const location = document.querySelector('.search-input').value || 'любой район';
    
    const searchData = {
        type: type,
        location: location,
        timestamp: new Date().toLocaleString('ru-RU')
    };
    
    console.log('Search parameters:', searchData);
    
    // Show search results
    alert(`Поиск: ${type} в ${location}\n\nПоказать 24 объекта`);
    
    // Here you would typically:
    // 1. Send search request to backend
    // 2. Update UI with search results
    // 3. Handle loading states
}

// Utility function for future API calls
async function fetchProperties(filters = {}) {
    try {
        // Example API call structure
        const response = await fetch('/api/properties', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(filters)
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching properties:', error);
        return [];
    }
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { handleSearch, fetchProperties };
}