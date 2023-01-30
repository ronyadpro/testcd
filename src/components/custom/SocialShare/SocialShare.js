import {
    FacebookIcon,
    FacebookMessengerIcon,
    FacebookMessengerShareButton,
    FacebookShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from 'react-share';
const SocialShare = ({ shareURL, title }) => {
    return (
        <div className="share-button mt--20">
            <p
                style={{
                    display: 'inline',
                    marginRight: '10px',
                    fontSize: '1.0rem'
                }}
            >
                <b>Share on:</b>
            </p>
            <FacebookShareButton
                className="me-1"
                hashtag="#Boighor"
                url={shareURL}
            >
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            <FacebookMessengerShareButton
                className="me-1"
                url={shareURL}
                appId="858852647653713"
            >
                <FacebookMessengerIcon size={32} round />
            </FacebookMessengerShareButton>
            <WhatsappShareButton
                className="me-1"
                url={shareURL}
                title={`${title} | Boighor`}
                separator=":: "
            >
                <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <TwitterShareButton
                className="me-1"
                url={shareURL}
                title={`${title} | Boighor`}
            >
                <TwitterIcon size={32} round />
            </TwitterShareButton>
        </div>
    );
};

export default SocialShare;
