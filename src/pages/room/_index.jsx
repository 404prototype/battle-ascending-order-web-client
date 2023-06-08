import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { socket, initSocket } from '../../api/socket';
import Ready from '../../components/step/Ready';
import Gaming from '../../components/step/Gaming';
import Result from '../../components/step/Result';
import Modal from '../../components/Modal';
import Spinner from '../../components/Spinner';
import styles from './_index.module.scss';

const Room = (props = {}) => {
  // enum ['READY', 'GAMING', 'RESULT']
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const [isJoined, setIsJoined] = useState(false);
  const [step, setStep] = useState('READY');
  const [initalGameInfo, setinitalGameInfo] = useState({});
  const [isInitSocket, setIsInitSocket] = useState(false);
  const [players, setPlayers] = useState([{ id: '제임스', ready: false }]);
  const [resultData, setResultData] = useState([]);
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

  useEffect(() => {
    setResultData({
      sheets: [
        {
          id: '2',
          sheet: [1, 3, 7, 5, 6, 7, 9, 9]
        },
        {
          id: '3',
          sheet: [2, 2, 3, 4, 1, 9, 10, 4]
        }
      ],
      winner: '2',
      loser: '3'
    });
    window.setStep = setStep;
    initSocket(id);
    // socket.connect();

    socket.on('connect', () => {
      setIsInitSocket(true);
      console.log(socket.id);
    });

    socket.emit('join-room');
    socket.on('response-join-room', (data) => {
      console.log('response-join-room', data);
      // if (data?.state === 'playing') {
      //   onResponseStartGame(data);
      //   return;
      // }
      setPlayers(data?.room?.players);
      setIsJoined(true);
    });

    socket.on('response-ready-game', (data) => {
      console.log('response-ready-game', data);
      setPlayers(data?.players);
    });

    return () => {
      socket.off('response-join-room');
      socket.off('response-ready-game');
      socket.disconnect();
    };
  }, [id]);

  const onResponseStartGame = (data) => {
    if (data.error) {
      Modal({ text: '현재 입장 가능한 인원이 초과 했습니다.' })
        .then(() => {
          navigate('/');
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setinitalGameInfo(data?.room);
    setStep('GAMING');
  };

  const onResponseEndGame = (data) => {
    setResultData(data);
    setStep('RESULT');
  };

  return (
    <div className={styles.room}>
      {!isJoined && <Spinner />}
      {isInitSocket &&
        (() => {
          switch (step) {
            case 'READY':
              return (
                <Ready
                  id={id}
                  info={ruleInfo}
                  players={players}
                  onResponseStartGame={onResponseStartGame}
                />
              );
            case 'GAMING':
              return (
                <Gaming
                  id={id}
                  initalGameInfo={initalGameInfo}
                  onResponseEndGame={onResponseEndGame}
                />
              );
            case 'RESULT':
              return <Result id={id} resultData={resultData} />;
            default:
              return;
          }
        })()}
    </div>
  );
};

export default Room;
