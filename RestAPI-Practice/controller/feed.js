exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [{title: 'First Post', content: 'First Post Data!!!!'}]
    });
}

exports.createPost = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    // TODO: create post in db
    res.status(201).json({
       message: 'Post Successfully Created',
       post: {
           id: new Date().toISOString(),
           title: title,
           content: content,
       }
    });
}