import React from 'react'

function PrivacyPolicy() {

  return (
    <article>
      <h1>Information We Collect</h1>
      <h2>Your email address</h2>
      <p>
        We collect and store your email address when you make an account with us.
        We will contact you at the provided email address if you yourself ask us to email you, such as for resetting your password.
        We will not contact you for any other reason.
        We delete your email address on your request, but it requires you to delete your account since everything is tied to your email address.
      </p>

      <h2>Your age</h2>
      <p>
        We allow our comic artists a large range of artistic expression that includes mature content.
        We don't want minors looking at that sort of thing!
        We collect your birthday when you sign up.
        When your account is deleted, that information is also deleted.
      </p>

      <h2>Anything you say</h2>
      <p>
        We have features on our website that allow you to write freely about any subject matter.
        Naturally this means that we store whatever content you posted until you delete it.
        This also means that we can potentially unintentionally store personally identifying information because of your own decision to post it.
        We are not liable for your decision to tell the Internet about yourself.  We cannot reasonably protect any individual user from their own decisions.
        We can only advise you not to share your email address, pictures of yourself, details of your life, or any other identifying information.
        You can delete any content you post from our servers at will, at any time and for any reason.
      </p>

      <h2>Your browsing activity</h2>
      <p>
        We collect and store your browsing activity regardless of whether you are logged in.
        This includes the IP address you're using, the preferred language of your browser, and interaction activity such as if you're scrolling down.
        A detailed breakdown of what we collect is not realistically available at the moment (we are in active development and it changes).
        Even though a breakdown is not available, the nature of the data is analytics data for the following purposes:
      </p>
      <ul>
        <li><strong>Statistics:</strong> Comic authors like to know who is reading their stuff! We generate page view data out of your browsing activity.</li>
        <li><strong>Recommendations:</strong> We want to plug content! We collect data about the comics you read to recommend similar ones.</li>
        <li><strong>Error reporting:</strong> If the website malfunctions, we collect information about that error which can include what you were doing.</li>
      </ul>
      <p>
        This collected information stays with us and is not sold to anybody for any reason.
        This collected information is also limited to what is strictly necessary to provide these features.
        Information that would disrupt our features if deleted is anonymized instead of deleted.
        For example, we don't delete page view counts when you delete your account.
      </p>
    </article>
  )
}

export default PrivacyPolicy;