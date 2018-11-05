angular.module("GithubOAuth", []).controller("MainController", MainCtrl);

MainCtrl.$inject = ["$http", "$window"];

function MainCtrl($http, $window) {
    this.app = "Angular App has connected successfully!";

    this.page = "partials/login.html";

    //===========================================
    // DEFINING CONSTANTS NECESSARY FOR OAUTH
    //===========================================
    const AUTHORIZE_URL = "https://github.com/login/oauth/authorize";
    const REDIRECT_URI = "http://localhost:3000/callback";
    const ENCODED_REDIRECT_URI = encodeURIComponent(REDIRECT_URI);
    const CLIENT_ID = "f6f472a58f4f6dafeae1";

    //===========================================
    // FUNCTION THAT IS CALLED WHEN USER CLICKS
    // SIGN IN WITH GITHUB
    //===========================================
    this.loginWithGithub = () => {
        //===========================================
        // WE HAVE TO REDIRECT TO THE AUTHORIZE URL PROVIDED BY GITHUB
        //===========================================
        $window.location.href = `${AUTHORIZE_URL}?scope=user%3Aemail&client_id=${CLIENT_ID}
        &redirect_uri=${ENCODED_REDIRECT_URI}`;
        //===========================================
        // HERE WE PASS ENCODED URI AS A PARAMETER IN A URI
        // CANNOT HAVE '/', IN THE WAY URI'S HAVE
        //===========================================
    };

    //===========================================
    // FUNCTION THAT CHECKS IF THERE IS ANY DATA IN THE SESSION
    //===========================================
    this.checkForSession = () => {
        $http({
            method: "GET",
            url: "/sessions"
        }).then(res => {
            console.log(res);
            const { currentUser } = res.data;
            if (currentUser) {
                console.log("User exists");
                this.name = currentUser.name;
                this.userData = currentUser;
                this.page = "partials/dashboard.html";
            } else {
                console.log("User does not exist");
            }
        });
    };
    this.checkForSession();
}
