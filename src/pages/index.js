import * as React from "react";
import { graphql } from "gatsby";

import Hero from "../sections/Hero";
import Posts from "../sections/Posts";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import "../normalize.css";
import "../global.css";
import Modal from "react-modal";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import CustomForm from "../components/CustomForm";
import "bootstrap/dist/css/bootstrap.min.css";
const IndexPage = ({ data }) => {
  const heroSectionData = data.allContentfulHeroSection.edges[0].node;
  const blogPostsData = data.allContentfulBlogPost.edges;
  const footerData = data.allContentfulFooter.edges[0].node;
  const websiteSeoData = data.allContentfulWebsiteSeo.edges[0].node;
  const { name, siteTitle, websiteDescription, siteUrl, keywords, socialImage } = websiteSeoData;
  // let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [isModalOpened, setIsModalOpened] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      const isOpenedNormally = JSON.parse(localStorage.getItem("modalOpened"));
      if (isOpenedNormally) return;
      setIsModalOpened(false);
    }, 2000);
  }, [JSON.parse(localStorage.getItem("modalOpened"))]);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
    setIsModalOpened(true);
    localStorage.setItem("modalOpened", true);
  }
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "50%",
      display: "flex",
      justifyContent: "center",
      // alignItems: "center",
      flexDirection: "column",
    },
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("submitted");
  };
  // const url = "http://localhost:8000";
  const url = "https://blog.us14.list-manage.com/subscribe/post?u=b634bdf381af3b784332e88da&amp;id=3a6592a134";
  // const SimpleForm = () => (
  //   <div id="mailchimp">
  //     <MailchimpSubscribe url={url} />
  //   </div>
  // );

  return (
    <main>
      <Modal
        onAfterClose={() => console.log("cclloosseedd")}
        isOpen={modalIsOpen || !isModalOpened}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Subscribe</h2>
        {/* <form onSubmit={handleSubmit}>
          <input />
          <button type="submit">Register</button>
          <button type="button" onClick={closeModal}>
            close
          </button>
        </form> */}
        {/* <SimpleForm /> */}
        <MailchimpSubscribe
          url={url}
          render={({ subscribe, status, message }) => (
            <CustomForm status={status} message={message} onValidated={(formData) => subscribe(formData)} />
          )}
        />
      </Modal>
      <Seo
        title="Home"
        siteTitle={siteTitle}
        description={websiteDescription}
        author={name}
        keywords={keywords}
        image={socialImage}
        siteUrl={siteUrl}
      />
      <Hero data={heroSectionData} />
      <Posts data={blogPostsData} />
      <div className="subscribe-email-modal-button-wrapper">
        <button onClick={() => setIsOpen((ps) => !ps)}>Subscribe</button>
      </div>
      <Footer data={footerData} />
    </main>
  );
};

export const query = graphql`
  query MyQuery {
    allContentfulWebsiteSeo {
      edges {
        node {
          name
          websiteDescription
          siteUrl
          socialImage {
            gatsbyImageData
            fixed {
              width
              height
            }
            file {
              url
            }
            title
          }
          siteTitle
          keywords
        }
      }
    }
    allContentfulHeroSection {
      edges {
        node {
          backgroundImage {
            gatsbyImageData
            title
          }
          title
          subtitle
          buttonText
        }
      }
    }
    allContentfulFooter {
      edges {
        node {
          facebookLink
          twitterLink
          instagramLink
          linkedInLink
          copyrightText
        }
      }
    }
    allContentfulBlogPost(limit: 4, sort: { fields: date, order: DESC }) {
      edges {
        node {
          date(formatString: "MMMM DD, YYYY")
          slug
          title
          shortDescription
          image {
            gatsbyImageData
            title
          }
        }
      }
    }
  }
`;

export default IndexPage;
