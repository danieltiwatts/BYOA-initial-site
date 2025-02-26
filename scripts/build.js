const fs = require('fs-extra');
const marked = require('marked');
const path = require('path');

// Add site configuration
const siteConfig = {
    title: "Your Site Name",
    author: "Your Name",
    description: "Your site description"
};

// Function to convert markdown to HTML
async function convertMarkdownToHtml(markdownPath, outputPath) {
    const markdown = await fs.readFile(markdownPath, 'utf-8');
    const html = marked.parse(markdown);
    
    const template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${siteConfig.description}">
    <title>${siteConfig.title}</title>
    <link rel="stylesheet" href="/BYOA-initial-site/assets/css/style.css">
    <link rel="icon" type="image/x-icon" href="/assets/favicon.ico">
</head>
<body>
    <header>
        <nav>
            <a href="/BYOA-initial-site/">Home</a>
            <a href="/BYOA-initial-site/blog">Blog</a>
            <a href="/BYOA-initial-site/pages/about.html">About</a>
            <a href="/BYOA-initial-site/pages/faq.html">FAQ</a>
        </nav>
    </header>
    <main class="content">
        ${html}
    </main>
    <footer>
        <p>© 2024 ${siteConfig.author}</p>
    </footer>
</body>
</html>`;

    await fs.writeFile(outputPath, template);
}

// Build function
async function build() {
    // Create directories if they don't exist
    await fs.ensureDir('docs/pages');
    await fs.ensureDir('docs/blog/posts');
    
    // Convert pages
    const pages = await fs.readdir('pages');
    for (const page of pages) {
        if (page.endsWith('.md')) {
            const name = path.basename(page, '.md');
            await convertMarkdownToHtml(
                `pages/${page}`,
                `docs/pages/${name}.html`
            );
        }
    }

    // Convert blog posts
    const posts = await fs.readdir('blog/posts');
    for (const post of posts) {
        if (post.endsWith('.md')) {
            const name = path.basename(post, '.md');
            await convertMarkdownToHtml(
                `blog/posts/${post}`,
                `docs/blog/posts/${name}.html`
            );
        }
    }

    // Copy static files
    await fs.copy('assets', 'docs/assets');
    await fs.copy('index.html', 'docs/index.html');
    await fs.copy('blog/index.html', 'docs/blog/index.html');
}

build().catch(console.error);