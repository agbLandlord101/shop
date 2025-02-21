const awsConfig = {
    Auth: {
      region: 'us-east-1', // Region of your User Pool
      userPoolId: 'us-east-1_example', // User Pool ID
      userPoolWebClientId: 'exampleClientId', // Your Web Client ID
      authenticationFlowType: 'USER_PASSWORD_AUTH', // The flow type to use (for username/password)
      mandatorySignIn: true, // Optional: Forces the user to sign in
    }
  };
  
  export default awsConfig;
  