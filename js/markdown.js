class MarkdownConverter {
    constructor() {
        this.rules = {
            // Headers
            h1: { pattern: /^# (.+)$/gm, replacement: '<h1>$1</h1>' },
            h2: { pattern: /^## (.+)$/gm, replacement: '<h2>$1</h2>' },
            h3: { pattern: /^### (.+)$/gm, replacement: '<h3>$1</h3>' },
            
            // Emphasis
            bold: { pattern: /\*\*(.+?)\*\*/g, replacement: '<strong>$1</strong>' },
            italic: { pattern: /\*(.+?)\*/g, replacement: '<em>$1</em>' },
            
            // Lists
            unorderedList: { 
                pattern: /^\* (.+)$/gm, 
                replacement: '<li>$1</li>',
                wrapper: '<ul>$1</ul>'
            },
            
            // Links
            link: { pattern: /\[(.+?)\]\((.+?)\)/g, replacement: '<a href="$2">$1</a>' },
            
            // Code
            inlineCode: { pattern: /`(.+?)`/g, replacement: '<code>$1</code>' },
            codeBlock: { 
                pattern: /```([\s\S]*?)```/g, 
                replacement: '<pre><code>$1</code></pre>' 
            },
            
            // Images
            image: { pattern: /!\[(.+?)\]\((.+?)\)/g, replacement: '<img src="$2" alt="$1">' },
            
            // Paragraphs
            paragraph: { pattern: /^(?!<[a-z])[^\n]+$/gm, replacement: '<p>$&</p>' }
        };
    }

    convert(markdown) {
        let html = markdown;

        // Apply each rule
        for (const rule of Object.values(this.rules)) {
            if (rule.wrapper) {
                // Handle wrapped elements (like lists)
                const matches = html.match(rule.pattern);
                if (matches) {
                    const items = matches.map(item => item.replace(rule.pattern, rule.replacement)).join('');
                    html = html.replace(matches.join('\n'), rule.wrapper.replace('$1', items));
                }
            } else {
                // Handle simple replacements
                html = html.replace(rule.pattern, rule.replacement);
            }
        }

        return html;
    }
}

// Example usage
document.addEventListener('DOMContentLoaded', () => {
    const converter = new MarkdownConverter();
    
    // If we're on a blog post page, load and convert the markdown
    const postContent = document.querySelector('.post-content');
    if (postContent && postContent.dataset.markdown) {
        fetch(postContent.dataset.markdown)
            .then(response => response.text())
            .then(markdown => {
                postContent.innerHTML = converter.convert(markdown);
            })
            .catch(error => console.error('Error loading markdown:', error));
    }
}); 