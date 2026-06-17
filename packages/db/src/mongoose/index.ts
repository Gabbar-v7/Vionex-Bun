import { appEnv } from '@packages/utilities';
import { connect } from 'mongoose';

main().catch(err => console.log(err));

async function main() {
    await connect(appEnv.MONGO_URI);
}