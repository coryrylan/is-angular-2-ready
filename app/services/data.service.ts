import {Injectable} from 'angular2/angular2';

@Injectable()
export class DataService {
    data: {
        milestones: Array<any>,
        slimMilestones: Array<any>,
    };

    constructor() {
        this.data = {
            milestones: [],
            slimMilestones: []
        };
    }

    loadMilestones() {
        return window.fetch('https://api.github.com/repos/angular/angular/milestones')
            .then(this._status)
            .then(this._json)
            .then(d => {
                this.data.milestones = d;
                this._updateSlimMilestones();
            }).catch(error => console.log('Request failed', error));
    }

    _updateSlimMilestones() {
        this.data.milestones.forEach(milestone => {
            let total = milestone.closed_issues + milestone.open_issues;
            let completion = (milestone.closed_issues / total) * 100;

            if (isNaN(completion)) {
                completion = 0;
            }

            this.data.slimMilestones.push({
                completion: completion.toFixed(0),
                title: milestone.title,
                open_issues: milestone.open_issues,
                closed_issues: milestone.closed_issues,
                description: milestone.description
            });
        });
    }

    _status(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(new Error(response.statusText));
        }
    }

    _json(response) {
        return response.json();
    }
}