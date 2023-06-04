import { useEffect, useState, Suspense } from 'react';
import { socket } from '../api/socket';
import Ready from '../components/step/Ready';
import Gaming from '../components/step/Gaming';
import Result from '../components/step/Result';
import Spinner from '../components/Spinner';

const Room = (props = {}) => {
  // enum ['READY', 'GAMING', 'RESULT']
  const [step, setStep] = useState('READY');
  const ruleInfo = {
    title: '배틀오름차순',
    desc: '랜덤으로 뽑은 숫자를 오름차순으로 최대한 길게 배열해라',
    rules: [
      {
        text: '각 플레이어는 순서대로 번갈아가며 한 명씩 투표룸에 입장해 1~10까지의 카드 중 두 장을 랜덤으로 뽑는다.'
      },
      { text: '한 플레이어가 뽑은 두 장의 카드는 모니터를 통해 상대 플레이어에게도 고지된다.' },
      {
        text: '투표룸에 있는 플레이어는 그 자리에서 두 장 중 한 장을 선택해 본인이 원하는 칸에 해당 숫자를 기입한다.',
        alert: '선택하지 않은 카드는 자동으로 상대방에게 넘어간다'
      },
      { text: '상대 플레이어는 본인의 시트 원하는 칸에 넘겨받은 숫자를 기입한다.' },
      { text: '각 플레이어의 시트 칸이 모두 채워질 때까지 턴을 반복한다.' },
      {
        text: '게임 종료시 오름차순으로 이어진 칸의 개수 중 가장 많은 칸의 개수를 플레이어의 승점으로 얻게 된다.'
      },
      { text: '이때 연속된 동일한 숫자도 오름차순으로 인정한다' }
    ]
  };
  const players = [{ name: '제임스' }, { name: '셜록' }];
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log(socket.id);
    });

    socket.on('response-start-game', (data) => {
      console.log(data);
    });

    socket.on('response-ready-game', () => {
      console.log('response-ready-game');
    });

    socket.on('response-pick-first-card', (data) => {
      console.log(data);
    });

    socket.on('response-pick-second-card', (data) => {
      console.log(data);
    });

    socket.on('response-write-number-to-sheet', (data) => console.log(data));
    socket.on('response-select-a-card', (data) => console.log('response-select-a-card', data));

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <Suspense fallback={<Spinner />}>
        {(() => {
          switch (step) {
            case 'READY':
              return <Ready info={ruleInfo} players={players} />;
            case 'GAMING':
              return <Gaming />;
            case 'RESULT':
              return <Result />;
            default:
              return;
          }
        })()}
      </Suspense>
    </div>
  );
};

export default Room;
