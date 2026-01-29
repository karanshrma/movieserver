const express = require("express");
const tvShowRouter = express.Router();

tvShowRouter.get("/api/tv/embed", async  (req, res) => {
    try {
        const {mediaId , seasonId , episodeId  , provider } = req.query;


        if (!mediaId || !seasonId || !episodeId || !provider) {
            return res.status(400).json({
                success: false,
                message: 'mediaId, seasonId, episodeId, provider are required',
            });
        }

        const url = await getTvEmbedUrl(
            mediaId,
            seasonId,
            episodeId,
            provider,
            "73d9b0d45a4e8147ef38e6e3b2aca99b",
        );

        res.json({
            success: true,
            embedUrl: url,
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: e.message,
        });
    }
})


async function getTvEmbedUrl(mediaId, seasonId, episodeId, provider, apiKey) {
    const primaryColor = '#FFFFFF';
    const secondaryColor = '#FFFFFF';
    const iconColor = '#ffffff';

    switch (provider) {
        case 'vidsrc':
            return `https://vidsrc.cc/v2/embed/tv/${mediaId}/${seasonId}/${episodeId}?autoPlay=true&autoNext=true`;
        case 'vidsrcpro':
            return `https://vidsrc.pro/embed/tv/${mediaId}/${seasonId}/${episodeId}`;
        case 'flicky':
            return `https://flicky.host/embed/tv/?id=${mediaId}/${seasonId}/${episodeId} `;
        case 'flickyanime':
            return `https://flicky.host/embed/anime/?id=${mediaId}/${seasonId}/${episodeId} `;
        case 'vidsrcxyz':
            return `https://vidsrc.xyz/embed/tv/${mediaId}?season=${seasonId}&episode=${episodeId}`;
        case 'embedsoap':
            return `https://www.embedsoap.com/embed/tv/?id=${mediaId}&s=${seasonId}&e=${episodeId}`;
        case 'autoembed':
            return `https://player.autoembed.cc/embed/tv/${mediaId}/${seasonId}/${episodeId}`;
        case 'smashystream':
            return `https://player.smashy.stream/tv/${mediaId}?s=${seasonId}&e=${episodeId}`;
        case 'anime':
            return `https://anime.autoembed.cc/embed/${media.name.replace(/\s+/g, '-').toLowerCase()}-episode-${episodeId}`;
        case 'nontonGo':
            return `https://www.NontonGo.win/embed/tv/${mediaId}/${seasonId}/${episodeId}`;
        case 'nontonGoAlt':
            return `https://www.NontonGo.win/embed/tv/?id=${mediaId}&s=${seasonId}&e=${episodeId}`;
        case '2animesub':
            return `https://2anime.xyz/embed/${media.name.replace(/\s+/g, '-').toLowerCase()}-episode-${episodeId}`;
        case '2embed':
            return `https://www.2embed.skin/embedtv/${mediaId}&s=${seasonId}&e=${episodeId}`;
        case 'AdminHiHi':
            const tvSlug = media.name.replace(/\s+/g, '-');
            return `https://embed.anicdn.top/v/${tvSlug}-dub/${episodeId}.html`;
        case 'moviesapi':
            return `https://moviesapi.club/tv/${mediaId}/${seasonId}/${episodeId}`;
        case 'vidlink':
            return `https://vidlink.pro/tv/${mediaId}/${seasonId}/${episodeId}?primaryColor=${primaryColor}&secondaryColor=${secondaryColor}&iconColor=${iconColor}&nextbutton=true&autoplay=false`;
        case 'vidlinkdub':
            return `https://vidlink.pro/tv/${mediaId}/${seasonId}/${episodeId}?player=jw&multiLang=true`;
        case 'vidsrcnl':
            return `https://player.vidsrc.nl/embed/tv/${mediaId}/${seasonId}/${episodeId}`;
        case 'vidsrc.rip':
            return `https://vidsrc.rip/embed/tv/${mediaId}/${seasonId}/${episodeId}`;
        case 'vidbinge':
            return `https://vidbinge.dev/embed/tv/${mediaId}/${seasonId}/${episodeId}`;
        case 'moviee':
            return `https://moviee.tv/embed/tv/${mediaId}?seasion=${seasonId}&episode=${episodeId}`;
        case 'multiembed':
            return `https://multiembed.mov/?video_id=${mediaId}&tmdb=1&s=${seasonId}&e=${episodeId}`;
        case 'multiembedvip':
            return `https://multiembed.mov/directstream.php?video_id=${mediaId}&tmdb=1&s=${seasonId}&e=${episodeId}`;
        case 'vidsrcicu':
            return `https://vidsrc.icu/embed/tv/${mediaId}/${seasonId}/${episodeId}`;
        case 'embedsu':
            return `https://embed.su/embed/tv/${mediaId}/${seasonId}/${episodeId}`;
        case 'cinescrape':
            try {
                const randomDelay = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
                await new Promise(resolve => setTimeout(resolve, randomDelay));

                const response = await fetch(`https://scraper.cinescrape.com/tvshow/${mediaId}/${seasonId}/${episodeId}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();

                if (!data || data.length === 0) throw new Error('No video data available');

                // Find the best available quality
                const qualityOrder = ['2160p', '1080p', '720p', '360p'];
                let selectedSource = null;

                for (let quality of qualityOrder) {
                    selectedSource = data.find(source => source.quality === quality);
                    if (selectedSource) break;
                }

                if (selectedSource && selectedSource.metadata && selectedSource.metadata.baseUrl) {
                    let streamUrl = selectedSource.metadata.baseUrl + '.mpd';

                    // Ensure HTTPS
                    const urlObj = new URL(streamUrl);
                    urlObj.protocol = 'https:';
                    streamUrl = urlObj.toString();

                    return streamUrl;
                } else {
                    throw new Error('No suitable video source found');
                }
            } catch (error) {
                console.error('Error fetching video from Cinescrape:', error);
                throw error;
            }
        case 'trailer':
            try {
                const trailerUrl = await fetchTrailer(mediaId, 'tv', apiKey);
                if (!trailerUrl) throw new Error('Trailer not found');
                return trailerUrl;
            } catch (error) {
                console.error('Error fetching trailer for TV show:', error);
                throw error;
            }

        default:
            throw new Error('Provider not recognized.');
    }
}
module.exports = tvShowRouter;