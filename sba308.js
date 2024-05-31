 // The provided course information.
   const CourseInfo = {
       id: 451, 
     name: "Introduction to JavaScript"
   };

    const AssignmentGroup = {
        id: 12345,
        name: "Fundamentals of JavaScript",
        course_id: 451,
        group_weight: 25,
        assignments: [
          {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50
          },
          {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150
          },
          {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15",
            points_possible: 500
          }
        ]
      };
      
      const LearnerSubmissions = [
        {
          learner_id: 125,
          assignment_id: 1,
          submission: {
            submitted_at: "2023-01-25",
            score: 47
          }
        },
        {
          learner_id: 125,
          assignment_id: 2,
          submission: {
            submitted_at: "2023-02-12",
            score: 150
          }
        },
        {
          learner_id: 125,
          assignment_id: 3,
          submission: {
            submitted_at: "2023-01-25",
            score: 400
          }
        },
        {
          learner_id: 132,
          assignment_id: 1,
          submission: {
            submitted_at: "2023-01-24",
            score: 39
          }
        },
        {
          learner_id: 132,
          assignment_id: 2,
          submission: {
            submitted_at: "2023-03-07",
            score: 140
          }
        }
      ];
           
   // Function to check if an assignment is due
      function isAssignmentDue(assignment, currentDate) {
       return new Date(assignment.due_at) <= currentDate; //  function returns the boolean value
  }

  // Function to calculate the percentage score for an assignment
   function calculatePercentage(submission, pointsPossible) {
     return (submission.score / pointsPossible) * 100;  
 }

  // Function to update the results object with the assignment percentage
    function updateResults(results, assignmentId, percentage) {
     results.assignments[assignmentId] = percentage;
 }

 // Main function to calculate weighted average scores and percentage score
   function calculateGrades(assignmentGroup, learnerSubmissions, learnerId) {
   try {
     const results = {
       avg: 0,
       assignments: {}
     };
     let totalEarned = 0;
     let totalPossible = 0;
     const currentDate = new Date();

     // 'for' loop to iterate over assignments
    for (let i = 0; i < assignmentGroup.assignments.length; i++) {
       const assignment = assignmentGroup.assignments[i];
       if (!isAssignmentDue(assignment, currentDate)) {
         continue;
       }

       // 'forEach' loop to find the corresponding submission
          learnerSubmissions.forEach(submission => {
        if (submission.learner_id === learnerId && submission.assignment_id === assignment.id) {
           const percentage = calculatePercentage(submission.submission, assignment.points_possible);
          updateResults(results, assignment.id, percentage);

           totalEarned += submission.submission.score * assignment.points_possible;
           totalPossible += assignment.points_possible * assignment.points_possible;
        }
       });

       if (i === assignmentGroup.assignments.length - 1) {
         break;
       }
     }

     if (totalPossible > 0) {
       results.avg = (totalEarned / totalPossible) * 100;
     } else {
      throw new Error('No assignments found for the calculation.');
     }

     return results;
   } catch (error) {
     console.error('An error occurred while calculating grades:', error);
     return null;
   }
 }

 // Example usage:
 const learnerId = 125; // Replace with the actual learner ID
 const grades = calculateGrades(AssignmentGroup, LearnerSubmissions, learnerId);
 if (grades) {
  console.log(`The weighted average for learner ${learnerId} is: ${grades.avg.toFixed(2)}%`);
   console.log('Individual assignment percentages:', grades.assignments);
 } else {
   console.log('Unable to calculate grades due to an error.');
 };


