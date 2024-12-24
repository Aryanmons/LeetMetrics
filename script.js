document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress.circle");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-card");

    function validateUsername(username) {
        if (username.trim() === "") {
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[A-Za-z0-9_]+$/;  
        const isMatching = regex.test(username);
        if (!isMatching) {
            alert("Invalid Username");
        }
        return isMatching;
    }

    async function fetchUserDetails(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        try {
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Unable to fetch the user details");
            }

            const parsedata = await response.json();
            console.log("Logging data: ", parsedata);

            displayuserdata(parsedata);
        } catch (error) {
            console.error("Error fetching user details:", error);
            alert("Failed to fetch user details. Please try again later.");
        } finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    function updateprogress(solved, total, label, circle) {
        const progressdegree = (solved / total) * 100;
        circle.style.setProperty("--progress-degree", `${progressdegree}%`);
        label.textContent = `${solved}/${total}`;
    }

    function displayuserdata(parsedata) {
        console.log("Parsed Data Structure:", parsedata);

        // Adjust property names based on actual API response
        const totalQuestions = parsedata.totalQuestions.count || 0;
        const totalEasy = parsedata.totalEasy || 0;
        const totalMedium = parsedata.totalMedium || 0;
        const totalHard = parsedata.totalHard || 0;

        const solvedTotal = parsedata.totalSolved || 0;
        const solvedEasy = parsedata.easySolved || 0;
        const solvedMedium = parsedata.mediumSolved || 0;
        const solvedHard = parsedata.hardSolved || 0;

        updateprogress(solvedEasy, totalEasy, easyLabel, easyProgressCircle);
        updateprogress(solvedMedium, totalMedium, mediumLabel, mediumProgressCircle);
        updateprogress(solvedHard, totalHard, hardLabel, hardProgressCircle);
    }

    searchButton.addEventListener("click", function () {
        const username = usernameInput.value;
        console.log("Logging username:", username);
        if (validateUsername(username)) {
            fetchUserDetails(username);
        }
    });
});
