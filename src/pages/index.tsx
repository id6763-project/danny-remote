import Head from 'next/head';
import { Component } from 'react';
import { Session } from '../api/session';
import { Api } from '../ui/Api';
import { PlaySvg, StopSvg } from '../ui/icons';
// import { PlayIcon } from '../ui/play-icon';
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
    amIPlaying?: boolean;
  }
> {
  constructor(props) {
    super(props);

    this.state = {
      amIPlaying: false,
    };
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
      this.setState({ danny, amIPlaying: true });
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
    }).then((danny) => {
      this.setState({ danny, amIPlaying: false });
    });
  }

  render() {
    const session = this.state.session;
    const dannyStatus = this.state.danny;

    const output =
      false &&
      dannyStatus?.isBusy &&
      dannyStatus.currentSessionId !== session.id ? (
        <p>
          Sorry, Danny is currently being used by someone else. Please try again
          later.
        </p>
      ) : this.state.amIPlaying ? (
        <>
          <button
            onClick={() => this.stopDanny()}
            className='text-center mx-auto mt-[20vh] w-full'
          >
            {StopSvg}
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => this.playDanny()}
            className='text-center mx-auto mt-[20vh] w-full'
          >
            {PlaySvg}
          </button>
        </>
      );

    return (
      <>
        <Head>
          <title>Danny the Dinosaur</title>
          <meta name='description' content='Generated by create next app' />
          <link rel='icon' href='/favico.png' />
        </Head>

        <div>{output}</div>
      </>
    );
  }
}
