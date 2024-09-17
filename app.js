const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.get('/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'styles.css'));
});

// Store the posts in array
let posts = [];

// Homepage
app.get('/', (req, res) => 
    {
        res.render('index', { posts });
    });

// Create a new post
app.post('/new-post', (req, res) => 
    {
        const newPost = 
            {
                title: req.body.title,
                author: req.body.author,
                content: req.body.content
            };

        // Store post in the array
        posts.push(newPost);

        // Redirect to the homepage after
        res.redirect('/');
    });

// Render edit page
app.get('/edit/:index', (req, res) => 
    {
        const index = req.params.index;
        const post = posts[index];

        // Check if the post exists
        if (post) 
            {
                res.render('edit', { post, index });
            } 
        else 
            {
            res.status(404).send('Post not found');
            }
    });

// Edit Submission
app.post('/update-post/:index', (req, res) => 
    {
        const index = req.params.index;

        // Update the post with the new data
        posts[index] = 
            {
                title: req.body.title,
                author: req.body.author,
                content: req.body.content
            };

        // Redirect back to the homepage after
        res.redirect('/');
});

// Delete
app.post('/delete/:index', (req, res) => 
    {
        const index = req.params.index;

        // Remove the post from the array
        posts.splice(index, 1);

        // Redirect back to the homepage
        res.redirect('/');
    });

// Start the server
app.listen(8080, () => 
    {
        console.log('Server is running on port 8080');
    });
