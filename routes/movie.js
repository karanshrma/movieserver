const express = require("express");
const movieRouter = express.Router();

movieRouter.get('/api/movie/embed', async (req, res) => {
    try {
        const { mediaId, provider, language } = req.query;

        if (!mediaId || !provider) {
            return res.status(400).json({
                success: false,
                message: 'mediaId & provider required',
            });
        }

        const url = await getMovieEmbedUrl(
            mediaId,
            provider,
            "73d9b0d45a4e8147ef38e6e3b2aca99b",
            language
        );

        res.json({
            success: true,
            embedUrl: url,
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message,
        });
    }
});
async function getMovieEmbedUrl(mediaId, provider, apiKey, language = null) {
    const primaryColor = '#FFFFFF';
    const secondaryColor = '#FFFFFF';
    const iconColor = '#FFFFFF';

    switch (provider) {
        case 'vidsrc':
            return `https://vidsrc.cc/v2/embed/movie/${mediaId}?autoPlay=true`;

        case 'vidlink':
            return `https://vidlink.pro/movie/${mediaId}?primaryColor=${primaryColor}&secondaryColor=${secondaryColor}&iconColor=${iconColor}`;

        case 'multiembed':
            return `https://multiembed.mov/?video_id=${mediaId}&tmdb=1`;

        default:
            throw new Error('Provider not supported');
    }
}
module.exports = movieRouter;