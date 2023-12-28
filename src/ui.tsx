import React, { useEffect, ChangeEvent, useState } from "react";
import ReactDOM from "react-dom";
import "./ui.scss";

export const App: React.FC = () => {
  const [direction, setDirection] = useState<string>("");
  const [directionHover, setDirectionHover] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);

  const handleClick = (d: string) => {
    const newDirection = d === direction ? "none" : d;

    setDirection(newDirection);

    parent.postMessage(
      {
        pluginMessage: {
          type: "set",
          direction: newDirection,
        },
      },
      "*"
    );
  };

  const handleEnter = (d: string) => {
    setDirectionHover(d);
  };

  const handleLeave = () => {
    setDirectionHover("");
  };

  useEffect(() => {
    window.onmessage = async (event) => {
      if (event.data.pluginMessage.type == "setToggle") {
        setChecked(event.data.pluginMessage.bool);
      }
      if (event.data.pluginMessage.type == "setActive") {
        if (event.data.pluginMessage.active) {
          setDirection(event.data.pluginMessage.active);
        }
      }
    };
  }, []);

  return (
    <div id="easometric">
      <div className="box">
        <div
          className={`left ${direction === "left" && "active"} ${
            directionHover === "left" && "hover"
          }`}
          data-direction="left"
          onClick={() => handleClick("left")}
          onMouseEnter={() => handleEnter("left")}
          onMouseLeave={handleLeave}
        ></div>
        <div className="top">
          <span
            className={`${direction === "top-left" && "active"} ${
              directionHover === "top-left" && "hover"
            }`}
            data-direction="top-left"
            onClick={() => handleClick("top-left")}
            onMouseEnter={() => handleEnter("top-left")}
            onMouseLeave={handleLeave}
          >
            <svg viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M18.77 13.36a1 1 0 0 0-1.41-.13L13 16.86V5a1 1 0 0 0-2 0v11.86l-4.36-3.63a1 1 0 1 0-1.28 1.54l6 5 .15.09.13.07a1 1 0 0 0 .72 0l.13-.07.15-.09 6-5a1 1 0 0 0 .13-1.41z"
              ></path>
            </svg>
          </span>
          <span
            className={`${direction === "top-right" && "active"} ${
              directionHover === "top-right" && "hover"
            }`}
            data-direction="top-right"
            onClick={() => handleClick("top-right")}
            onMouseEnter={() => handleEnter("top-right")}
            onMouseLeave={handleLeave}
          >
            <svg viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M18.77 13.36a1 1 0 0 0-1.41-.13L13 16.86V5a1 1 0 0 0-2 0v11.86l-4.36-3.63a1 1 0 1 0-1.28 1.54l6 5 .15.09.13.07a1 1 0 0 0 .72 0l.13-.07.15-.09 6-5a1 1 0 0 0 .13-1.41z"
              ></path>
            </svg>
          </span>
        </div>
        <div
          className={`right ${direction === "right" && "active"} ${
            directionHover === "right" && "hover"
          }`}
          data-direction="right"
          onClick={() => handleClick("right")}
          onMouseEnter={() => handleEnter("right")}
          onMouseLeave={handleLeave}
        ></div>
      </div>
      <nav>
        <ul>
          <li>
            <button
              className={`left ${direction === "left" && "active"} ${
                directionHover === "left" && "hover"
              }`}
              data-direction="left"
              onClick={() => handleClick("left")}
              onMouseEnter={() => handleEnter("left")}
              onMouseLeave={handleLeave}
            >
              Left
            </button>
          </li>
          <li>
            <button
              className={`${direction === "top-left" && "active"} ${
                directionHover === "top-left" && "hover"
              }`}
              data-direction="top-left"
              onClick={() => handleClick("top-left")}
              onMouseEnter={() => handleEnter("top-left")}
              onMouseLeave={handleLeave}
            >
              Top L
            </button>
          </li>
          <li>
            <button
              className={`${direction === "top-right" && "active"} ${
                directionHover === "top-right" && "hover"
              }`}
              data-direction="top-right"
              onClick={() => handleClick("top-right")}
              onMouseEnter={() => handleEnter("top-right")}
              onMouseLeave={handleLeave}
            >
              Top R
            </button>
          </li>
          <li>
            <button
              className={`right ${direction === "right" && "active"} ${
                directionHover === "right" && "hover"
              }`}
              data-direction="right"
              onClick={() => handleClick("right")}
              onMouseEnter={() => handleEnter("right")}
              onMouseLeave={handleLeave}
            >
              Right
            </button>
          </li>
        </ul>
      </nav>
      <label className="switch">
        <span>Close after selection</span>
        <input
          type="checkbox"
          name="close"
          checked={checked}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setChecked(event.target.checked);

            parent.postMessage(
              {
                pluginMessage: {
                  type: "toggle",
                  bool: event.target.checked,
                },
              },
              "*"
            );
          }}
        />
        <div></div>
      </label>
      <p className="follow">
        Follow me on{" "}
        <a target="_blank" href="https://twitter.com/aaroniker_me">
          𝕏 (@aaroniker_me)
        </a>{" "}
        for updates &amp; more.
      </p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("react-page"));
