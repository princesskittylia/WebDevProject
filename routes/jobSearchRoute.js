app.post('/search-jobs', async (req, res) => {
    try {
        const { skills, education, experience } = req.body;
        const query = {};

        if (skills && skills.length > 0) {
            query.requirements = { $in: skills };
        }

        // Add more conditions based on education, experience, etc., as needed

        const jobListings = await JobListing.find(query);
        res.json(jobListings);
    } catch (error) {
        res.status(500).send(error.message);
    }
});