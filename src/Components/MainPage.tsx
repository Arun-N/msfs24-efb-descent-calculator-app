import {
  GamepadUiView,
  RequiredProps,
  TextBox,
  TTButton,
  TVNode,
  UiViewProps,
} from "@efb/efb-api";
import { FSComponent, Subject } from "@microsoft/msfs-sdk";
import "./MainPage.scss";

interface MainPageProps extends RequiredProps<UiViewProps, "appViewService"> {
  /** The page title */
  title: string;

  /** The page background color */
  color: string;
}

export class MainPage extends GamepadUiView<HTMLDivElement, MainPageProps> {
  public readonly tabName = MainPage.name;

  public render(): TVNode<HTMLDivElement> {
    const currentAltitude = Subject.create<string>("");
    const targetAltitude = Subject.create<string>("");

    const currentSpeed = Subject.create<string>("");
    const targetSpeed = Subject.create<string>("");

    const currentWind = Subject.create<string>("");
    const currentHeading = Subject.create<string>("");

    const todValue = Subject.create<string>("");

    const descentResultRef = FSComponent.createRef<HTMLDivElement>();

    return (
      <div
        ref={this.gamepadUiViewRef}
        class="main-page-container"
        style={`--color: ${this.props.color}`}
      >
        <div class="header">
          <h2>Descent Calculator</h2>
          <p>
            Get an approximate Top of Descent (TOD) value by inputting your
            altitude, speed and wind data.
          </p>
        </div>

        <div class="content">
          <div class={"descent-calc-form"}>
            {/* -------------- Altitude -------------- */}
            <div class={"form-grid-2"}>
              <div class={"form-grid-item"}>
                <label>Current Altitude (feet)</label>
                <TextBox
                  value={currentAltitude}
                  onInput={(e) => {
                    console.log("Value: ", e.value);
                    currentAltitude.set(e.value);
                  }}
                  placeholder={"34000"}
                />
              </div>
              <div class={"form-grid-item"}>
                <label>Target Altitude (feet)</label>
                <TextBox
                  value={targetAltitude}
                  onInput={(e) => targetAltitude.set(e.value)}
                  placeholder={"3000"}
                />
              </div>
            </div>
            {/* -------------- Speed -------------- */}
            <div class={"form-grid-2"}>
              <div class={"form-grid-item"}>
                <label>Current Speed (Kts)</label>
                <TextBox
                  value={currentSpeed}
                  onInput={(e) => currentSpeed.set(e.value)}
                  placeholder={"260"}
                />
              </div>
              <div class={"form-grid-item"}>
                <label>Target Speed (Kts)</label>
                <TextBox
                  value={targetSpeed}
                  onInput={(e) => targetSpeed.set(e.value)}
                  placeholder={"220"}
                />
              </div>
            </div>
            {/* -------------- Wind & Heading -------------- */}
            <div class={"form-grid-2"}>
              <div class={"form-grid-item"}>
                <label>Current Wind</label>
                <TextBox
                  value={currentWind}
                  onInput={(e) => currentWind.set(e.value)}
                  placeholder={"270/50"}
                />
              </div>
              <div class={"form-grid-item"}>
                <label>Aircraft Heading</label>
                <TextBox
                  value={currentHeading}
                  onInput={(e) => currentHeading.set(e.value)}
                  placeholder={"180"}
                />
              </div>
            </div>
          </div>
          <div class={"descent-calc-button-grp"}>
            <TTButton
              key="Calculate"
              callback={(): void => {
                try {
                  const currAlt = parseInt(currentAltitude.get());
                  const tarAlt = parseInt(targetAltitude.get());
                  const currSpeed = parseInt(currentSpeed.get());
                  const tarSpeed = parseInt(targetSpeed.get());

                  // -------- Wind component calculation.
                  // Headwind Component = Wind Speed × cos(Angle)
                  // Angle (degrees) = Wind Direction − Current Heading
                  // Angle (radians) = Angle (degrees) × π/180

                  const windAngle = parseInt(currentWind.get().split("/")[0]);
                  const windSpeed = parseInt(currentWind.get().split("/")[1]);
                  const aircraftHdg = parseInt(currentHeading.get());
                  const headwindComponent =
                    windSpeed *
                    Math.cos((windAngle - aircraftHdg) * (Math.PI / 180));

                  // -------- Top of Descent (TOD) calculation.
                  const tod = Math.ceil(
                    (currAlt - tarAlt) / 300 +
                      (currSpeed - tarSpeed) / 10 +
                      headwindComponent / 10
                  );
                  todValue.set(tod.toString());
                  descentResultRef.instance.classList.add("visible");
                } catch (error) {
                  console.error(error);
                }
              }}
            />
          </div>
          <div ref={descentResultRef} class={"descent-result-grp"}>
            <p>Top of Descent (TOD): {todValue}nm</p>
          </div>
        </div>
      </div>
    );
  }
}
