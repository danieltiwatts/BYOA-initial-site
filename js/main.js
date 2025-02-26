// Main JavaScript file
document.addEventListener('DOMContentLoaded', () => {
    // Newsletter form handling
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // TODO: Implement ConvertKit integration
            console.log('Newsletter form submitted');
        });
    }

    // Example featured posts data
    const featuredPosts = [
        {
            title: 'Getting Started with Static Sites',
            excerpt: 'Learn how to build and deploy static websites...',
            date: '2024-03-21',
            url: '/blog/getting-started'
        },
        // Add more posts as needed
    ];

    // Render featured posts
    const postsGrid = document.querySelector('.posts-grid');
    if (postsGrid) {
        featuredPosts.forEach(post => {
            const postElement = createPostElement(post);
            postsGrid.appendChild(postElement);
        });
    }
});

function createPostElement(post) {
    const article = document.createElement('article');
    article.className = 'post-card';
    article.innerHTML = `
        <h3><a href="${post.url}">${post.title}</a></h3>
        <p>${post.excerpt}</p>
        <time>${post.date}</time>
    `;
    return article;
} 