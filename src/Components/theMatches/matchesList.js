import React from "react";
import { easePolyOut } from "d3-ease";
// We use that instead of Animate because we want to animate a list of items and not single items
import NodeGroup from "react-move/NodeGroup";

const MatchesList = (props) => {
  const showMatches = () => {
    return props.matches ? (
      <NodeGroup
        // the list to animate
        data={props.matches}
        // like key in React list
        keyAccessor={(d) => d.id}
        start={() => ({
          opacity: 0,
          x: -200,
        })}
        enter={(_, i) => ({
          opacity: [1],
          x: [0],
          timing: { duration: 500, delay: i * 50, ease: easePolyOut },
        })}
        update={(_, i) => ({
          opacity: [1],
          x: [0],
          timing: { duration: 500, delay: i * 50, ease: easePolyOut },
        })}
        leave={(_, i) => ({
          opacity: [0],
          x: [-200],
          timing: { duration: 500, delay: i * 50, ease: easePolyOut },
        })}
      >
        {(nodes) => (
          <div>
            {nodes.map(({ key, data, state: { x, opacity } }) => (
              <div
                key={key}
                className="match_box_big"
                style={{
                  opacity,
                  transform: `translate(${x}px)`,
                }}
              >
                <div className="block_wraper">
                  <div className="block">
                    <div
                      className="icon"
                      style={{
                        background: `url(/images/team_icons/${data.localThmb}.png)`,
                      }}
                    ></div>
                    <div className="team">{data.local}</div>
                    <div className="result">{data.resultLocal}</div>
                  </div>
                  <div className="block">
                    <div
                      className="icon"
                      style={{
                        background: `url(/images/team_icons/${data.awayThmb}.png)`,
                      }}
                    ></div>
                    <div className="team">{data.away}</div>
                    <div className="result">{data.resultAway}</div>
                  </div>
                </div>
                <div className="block_wraper nfo">
                  <div>
                    <strong>Date: </strong>
                    {data.date}
                  </div>
                  <div>
                    <strong>Stadium: </strong>
                    {data.stadium}
                  </div>
                  <div>
                    <strong>Referee: </strong>
                    {data.referee}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </NodeGroup>
    ) : null;
  };

  return <div>{showMatches()}</div>;
};

export default MatchesList;
