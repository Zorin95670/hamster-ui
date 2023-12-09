import { Subject } from 'rxjs';

const DialogEvent = new Subject();
const ReloadActivitiesEvent = new Subject();
const ReloadTagsEvent = new Subject();
const UpdateColorEvent = new Subject();

export default {
  DialogEvent,
  ReloadActivitiesEvent,
  ReloadTagsEvent,
  UpdateColorEvent,
};
