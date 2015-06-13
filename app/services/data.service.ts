declare let Zone;
declare let fetch;
declare let Promise;

let dataService = (function () {
    let data = {
        milestones: [],
        slimMilestones: []
    };

    return {
        data: data,
        loadMilestones: loadMilestones
    }

	function loadMilestones() {
        return Zone.bindPromiseFn(fetch)('https://api.github.com/repos/angular/angular/milestones')
            .then(status)
            .then(json)
            .then(function (d) {
                data.milestones = d;
                updateSlimMilestones();
        }).catch(error => console.log('Request failed', error));
    }
  
    function updateSlimMilestones() {
        data.milestones.forEach(milestone => {
            let total = milestone.closed_issues + milestone.open_issues;
            let completion = (milestone.closed_issues / total) * 100;
    
            if(isNaN(completion)) {
                completion = 0;
            }
        
            data.slimMilestones.push({ 
              completion: completion.toFixed(0),
              title: milestone.title,
              open_issues: milestone.open_issues,
              closed_issues: milestone.closed_issues,
              description: milestone.description
            });
        });
    }
  
    function status(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(new Error(response.statusText));
        }
    }

    function json(response) {
      return response.json();
    }
} ());

export default dataService;