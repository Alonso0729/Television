// Complete working version for player integration
const version = 'jsjiami.com.v7';

function main(input) {
    // 1. First define all helper functions internally
    function getQueryParam(params) {
        if (!params || !params.url) return null;
        
        try {
            // Modern browser approach
            const urlObj = new URL(params.url);
            return urlObj.searchParams.get(params.key);
        } catch (e) {
            // Fallback for older environments
            const key = params.key + '=';
            const url = params.url.split('#')[0]; // Remove hash
            const queryString = url.split('?')[1] || '';
            const pairs = queryString.split('&');
            
            for (let i = 0; i < pairs.length; i++) {
                const pair = pairs[i].split('=');
                if (decodeURIComponent(pair[0]) === params.key) {
                    return decodeURIComponent(pair[1] || '');
                }
            }
            return null;
        }
    }

    function simpleHash(params) {
        // Simple hash function for demo (replace with CryptoJS.MD5 if available)
        let hash = 0;
        if (!params || !params.data) return '0';
        
        const str = params.data.toString();
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash).toString(16);
    }

    // 2. Main logic with proper error handling
    try {
        const defaults = {
            clientIp: '127.0.0.1',
            defaultId: 'default',
            defaultIp: '50.7.234.10:8278',
            authPrefix: 'tvata nginx auth module'
        };

        if (!input || typeof input !== 'object' || !input.url) {
            throw new Error('Invalid input: must provide {url: "..."}');
        }

        const id = getQueryParam({url: input.url, key: 'id'}) || defaults.defaultId;
        const ip = getQueryParam({url: input.url, key: 'ip'}) || defaults.defaultIp;

        // Construct URL
        let streamUrl = `http://${ip}/${id}/playlist.m3u8`;
        
        // Generate auth tokens
        const timestamp = Math.floor(Date.now() / 150);
        const authString = `${defaults.authPrefix}/${id}/${timestamp}`;
        const authToken = simpleHash({data: authString});

        // Add auth parameters
        streamUrl += `?token=${authToken}&t=${timestamp}`;

        // Return the result expected by players
        return {
            url: streamUrl,
            headers: {
                'CLIENT-IP': defaults.clientIp,
                'X-FORWARDED-FOR': defaults.clientIp
            }
        };

    } catch (error) {
        console.error('Error in stream processing:', error);
        return {
            error: true,
            message: error.message
        };
    }
}

// 3. How to use in different environments:

// Browser usage:
// const result = main({url: "http://example.com/stream?id=123&ip=1.2.3.4"});

// Node.js usage:
// if (typeof module !== 'undefined' && module.exports) {
//     module.exports = { main };
// }
