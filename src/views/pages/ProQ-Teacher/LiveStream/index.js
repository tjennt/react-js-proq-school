import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import BreadCrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import { Row, Col, Container, Button } from "reactstrap";
import "../../../../assets/scss/pages/app-chat.scss";
import { history } from "../../../../history";

const StyledVideo = styled.video`
  height: 40%;
  width: 50%;
  border-radius: 20px;
  box-shadow: 0 0 6px #ff3c00e8;
`;

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <StyledVideo playsInline autoPlay ref={ref} />;
};

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

const Room = (props) => {
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  console.log(props);
  const roomID = props.match.params.id;
  const streamRef = useRef();
  const ar = [];

  useEffect(() => {
    socketRef.current = io.connect("https://server-dev.asia");
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        streamRef.current = stream;
        socketRef.current.emit("join room", roomID);
        socketRef.current.on("all users", (users) => {
          const peers = [];
          users.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push({
              peerID: userID,
              peer,
            });
          });
          setPeers(peers);
        });

        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          const peerObj = {
            peer,
            peerID: payload.callerID,
          };

          setPeers((users) => [...users, peerObj]);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });

        socketRef.current.on("user left", (id) => {
          const peerObj = peersRef.current.find((p) => p.peerID === id);
          if (peerObj) {
            peerObj.peer.destroy();
          }
          const peers = peersRef.current.filter((p) => p.peerID !== id);
          peersRef.current = peers;
          setPeers(peers);
        });
      });
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }
  const outStream = () => {
    const cat = {
      data: true,
    };
    socketRef.current.emit("out-live", cat);
    streamRef.current.getTracks().forEach(function (track) {
      track.stop();
    });
    history.push("/teacher/schedule");
  };
  return (
    <React.Fragment>
      <BreadCrumbs
        breadCrumbTitle="Giảng viên"
        breadCrumbParent="Lịch dạy "
        breadCrumbActive="Lịch dạy của giảng viên"
      />
      <Row>
        <Col lg="12">
          <Button onClick={outStream} color="primary">
            Thoát video call
          </Button>
        </Col>
        <Col sm="12" className="mt-2">
          <div className="chat-app-window ">
            <Container className="user-chats">
              <StyledVideo
                controls
                muted
                ref={userVideo}
                autoPlay
                playsInline
              />
              {peers.map((peer) => {
                if (!ar.includes(peer.peerID)) {
                  ar.push(peer.peerID);
                  return <Video key={peer.peerID} peer={peer.peer} />;
                }
                return null;
              })}
            </Container>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Room;
