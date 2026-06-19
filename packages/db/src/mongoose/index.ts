import { appEnv } from '@packages/utilities';
import { connect } from 'mongoose';

connect(appEnv.MONGO_URI).catch(err => console.log(err));
