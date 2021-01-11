module.exports = (res, error) => {
    res.status(500).json({
        success: false,
        error: error.message ? error.message : error
    })
}