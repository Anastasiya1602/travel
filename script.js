document.addEventListener('DOMContentLoaded', function() {
    
    const content = document.querySelector('.reviews__content');
    const indicators = document.querySelectorAll('.indicator');
    const reviewCards = document.querySelectorAll('.review-card');
        
        if (!content || indicators.length === 0) return;
        
        function updateActiveIndicator() {
            const scrollPosition = content.scrollLeft;
            const cardWidth = reviewCards[0].offsetWidth;
            const gap = 30;
            const totalWidth = cardWidth + gap;
            
            let activeIndex = Math.round(scrollPosition / totalWidth);
            activeIndex = Math.min(activeIndex, reviewCards.length - 1);
            
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === activeIndex);
            });
        }
        
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                const cardWidth = reviewCards[0].offsetWidth;
                const gap = 30;
                
                let scrollPosition = index * (cardWidth + gap);
                const maxScroll = content.scrollWidth - content.clientWidth;
                scrollPosition = Math.min(scrollPosition, maxScroll);
                
                content.scrollTo({
                    left: scrollPosition,
                    behavior: 'smooth'
                });
            });
        });
        
        let scrollTimeout;
        content.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(updateActiveIndicator, 100);
        });
        
        updateActiveIndicator();
    });