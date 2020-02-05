## About
This is a default React Front-end.

- Standard react + typescript
- Routing, private and public routes
- Context api en hooks
- Folder structure
- Styling (SASS)
- Default requests (REST)
- Authentication
- Some example components

**GraphQL**

The default react app is setup for an Laravel Rest API. To use GraphQL
instead of rest use Apollo GrapQL. Click the following link to get
started: [https://www.apollographql.com/docs/react/get-started/]()


## Use
**Installation**

1. Make sure you have node and npm installed
2. Clone the project repo to your local device
3. Run `npm install`
4. Copy .env.example and name the copy to .env.local


**Development**

1. Run `npm start`


**Production**

1. Run `npm run build`
2. Point the server to the build folder

## Structure

All content is in the src folder
- /assets
    - /icons
    - /images
- /components
    - All react components should be in this folder
    - Components should not have any direct connection to the api
- /contexts
    - All react context are in this folder
- /models
  -   Contains a base Model Class a well as all the models that extend
      it
- /requests
    - All request types are in this folder
- /styles
  - Styles are in this folder as .scss files
  - All style sheets need to be imported either in styles.scss or in a
    file that's imported in styles.scss
    
    
    
     
