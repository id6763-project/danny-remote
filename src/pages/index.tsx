import Head from 'next/head';
import { Component } from 'react';
import { Session } from '../api/session';
import { Api } from '../ui/Api';
import { PlayIcon } from '../ui/play-icon';
import { sessionManager } from '../ui/session-manager';

export interface DannyStatus {
  isBusy: boolean;
  currentSessionId?: string;
}

export default class Home extends Component<
  {},
  {
    session?: Session;
    danny?: DannyStatus;
  }
> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    console.log('Loading Session');
    sessionManager.getSession().then((session) =>
      Api.invoke<DannyStatus>('danny')
        .then((danny) => ({
          session,
          danny,
        }))
        .then(({ session, danny }) => this.setState({ session, danny }))
        .then(() => {})
    );
  }

  playDanny() {
    Api.invoke<DannyStatus>('danny/play', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId: this.state.session.id,
      }),
    }).then((danny) => {
      this.setState({ danny });
    });
  }

  stopDanny() {
    Api.invoke<DannyStatus>('danny/stop', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId: this.state.session.id,
      }),
    });
  }

  render() {
    const session = this.state.session;
    const dannyStatus = this.state.danny;

    const output =
      dannyStatus?.isBusy &&
      dannyStatus.currentSessionId !== this.state.session.id ? (
        <p>
          Sorry, Danny is currently being used by someone else. Please try again
          later.
        </p>
      ) : (
        <>
          <button
            onClick={() => this.playDanny()}
            className='text-center mx-auto mt-[20vh] w-full bg-indigo-400'
          >
            {PlayIcon}
          </button>
        </>
      );

    return (
      <>
        <Head>
          <title>Create Next App</title>
          <meta name='description' content='Generated by create next app' />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <div>
          Session {JSON.stringify(this.state.session)}
          Danny {JSON.stringify(this.state.danny)}
          {output}
        </div>
      </>
    );
  }
}
