## CapWise

- [General info](#general-info)
- [Technologies](#technologies)
- [Contents](#content)
- [Limitations](#limitations)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## General Info

Our team is developing “CityConnect” to help citizens to quickly report problems and communicate with their local city halls, by making it simple and fast with a user-friendly, real-time interface.

## Technologies

Technologies used for this project:

- HTML 5, CSS
- JavaScript
- Bootstrap 5.0
- Firebase Version 8 (Authentication, Firestore, Storage, Hosting)

## Content

Content of the project folder:

```
Top level of project folder:
├── .gitignore                 # Git ignore file
└── README.md                  # Current page
└── about.html                 # About us HTML file, contains information about our values and mission
└── account.html               # User profile HTML file, contains with all the user's information
└── discussion.html            # Create discussion HTML file, a page for creating a discussion
└── discussionThanks.html      # HTML file for showing gratitude after the user has submitted a discussion
└── editPost.html              # HTML file for editing discussion
└── forums.html                # HTML file for displaying all the discussion, "view posts" page
└── inbox.html                 # HTML file that displays all the ticket submissions of the user
└── inboxView.html             # HTML file that displays the full view of a ticket submission
└── loading.html               # Loading HTML file for forums.html
└── loadingMyDiscussion.html   # Loading HTML file for myDiscussion.html
├── main.html                  # Main HTML file, the landing page after log-in or user set-up
└── myDiscussion.html          # HTML file that displays all the discussion submissions of the user
└── notification.html          # HTML file that displays user's notification
└── post.html                  # HTML file for creating a ticket
└── postThanks.html            # HTML file for showing gratitude after the user has submitted a ticket
└── postView.html              # HTML file that displays all the ticket submissions of the user
├── signup.html                # Signup HTML file, when the user wants to signup for an account

It has the following subfolders and files:

├── .git                       # Folder for git repo
├── images                     # Folder for images
        /about-icon.png
        /city.jpeg
        /cityconnect.png
        /default_profile_picture.png
        /mypost-icon.png
        /post-icon.png
        /profile-icon.png
        /ticket-icon.png
        /userIcon.jpg

├── scripts                         # Folder for scripts

        /accountsv2.js              # JS for account.html
        /authentication.js          # JS for firebase authentication 
        /discussion.js              # JS for discussion.html
        /editPost.js                # JS for ediPost.html
        /firebaseAPI_TEAM19.js      # firebase API stuff, shared across pages
        /footer.js                  # JS for footer
        /forum.js                   # JS for forum.html
        /inbox.js                   # JS for login.html
        /inboxView.js               # JS for inboxView.html
        /loading.js                 # JS for loading.html
        /loadingMyDiscussion.js     # JS for loadingMyDiscussion.html
        /main.js                    # JS for main.html
        /myDiscussion.js            # JS for myDiscussion.html
        /navbar.js                  # JS for navbar
        /notification.js            # JS for notification.html
        /post.js                    # JS for post.html
        /postView.js                # JS for postView.js
        /script.js                  # JS for log out and display profile picture
        /skeleton.js                # JS for changing the navbar and footer before and after sign in

├── styles                          # Folder for styles
        /about.css                  # style for about.html
        /account.css                # style for account.html
        /discussion.css             # style for discussion.htm
        /editPost.css               # style for editPost.html
        /footer.css                 # style for footer.html
        /forumStyle.css             # style for forum.htm
        /inbox.css                  # style for inbox.html
        /inboxView.css              # style for inboxView.html
        /login.css                  # style for index.htm
        /mainStyle.css              # style for main.html
        /myDiscussion.css           # style for myDiscussion.html
        /navbar.css                 # style for navbar.htm
        /notification.css           # style for notification.html
        /post.css                   # style for post.html
        /postView.css               # style for postView.htm
        /style.css                  # style for general styling

├── text                            # Folder for navbar and footer
        /footer_after.html          # HTML for the footer after login
        /footer_before.html         # HTML for the footer before login
        /nav_after.html             # HTML for the navbar after login
        /nav_before.html            # HTML for the navbar before login


Firebase hosting files:
├── .firebase
	/hosting..cache
├── .firebaserc
├── 404.html
├── firebase.json
├── firestore.indexes.json
├── firestore.rules
├── storage.rules

```

## Limitations
- Making a title too long and one word in tickets causes all tickets to be pushed off the screen      
- When voting on forums.html, users can only upvote one post at a time, changing the button color. If they upvote another post, the first one reverts to its original color. The color change is visible on the client side and will properly display the server-side color after a page refresh.

## Resources

- Logo from logoai (Open Source https://www.logoai.com)

## Contact

- Wayne Chen - wchen206@my.bcit.ca
- Clement Quach -cquach6@my.bcit.ca
- Daniel Law - dlaw37@my.bcit.ca

## Acknowledgements

- <a href="https://fonts.google.com/">Google Fonts</a>
- <a href="https://getbootstrap.com/">Bootstrap</a>
