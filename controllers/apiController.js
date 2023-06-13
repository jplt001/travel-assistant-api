// Protected API route controller
exports.protectedRoute = (req, res) => {
    res.json({ message: 'Access granted to protected API route' });
};

// Another protected API route controller
exports.anotherProtectedRoute = (req, res) => {
    res.json({ message: 'Access granted to another protected API route' });
};


exports.unprotectedRoute = (req, res) => {
    res.json({ message: 'Access granted to unprotected API route' });
}