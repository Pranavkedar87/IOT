import type { QuizQuestion, RelayComponentPart } from '../types'

export const RELAY_PARTS: RelayComponentPart[] = [
  {
    id: 'coil',
    name: 'Coil (Electromagnetic Solenoid)',
    shortDesc: 'Carries the control current and creates a magnetic field.',
    detail: 'Made of copper wire wound around an iron core. When 5V DC control current flows from the Arduino/driver circuit, an electromagnetic field is generated according to Ampere\'s Law.',
    color: '#f59e0b'
  },
  {
    id: 'core',
    name: 'Iron Core',
    shortDesc: 'Concentrates and intensifies the magnetic flux.',
    detail: 'A ferromagnetic cylinder inside the coil that concentrates magnetic lines of force, providing a powerful pulling force to attract the movable armature.',
    color: '#94a3b8'
  },
  {
    id: 'armature',
    name: 'Movable Armature',
    shortDesc: 'Moves when attracted by the energized electromagnet.',
    detail: 'A balanced ferromagnetic pivoted lever attached to the moving electrical contact. It tilts downward when the coil is energized and springs back when de-energized.',
    color: '#38bdf8'
  },
  {
    id: 'spring',
    name: 'Return Spring',
    shortDesc: 'Pulls the armature back to resting position when de-energized.',
    detail: 'A mechanical tension spring that ensures rapid and decisive contact break as soon as coil power is cut off, maintaining the default COM-to-NC circuit state.',
    color: '#ec4899'
  },
  {
    id: 'com',
    name: 'COM (Common Terminal)',
    shortDesc: 'Common terminal of the switching contact.',
    detail: 'The input terminal connected to the moving contact blade. Load supply power enters here and is directed either to NC or NO.',
    color: '#a855f7'
  },
  {
    id: 'nc',
    name: 'NC (Normally Closed Contact)',
    shortDesc: 'Normally connected to COM when the relay is at rest (OFF).',
    detail: 'Form-B contact. Complete circuit exists between COM and NC while coil is unpowered. Breaks connection immediately upon coil energization.',
    color: '#ef4444'
  },
  {
    id: 'no',
    name: 'NO (Normally Open Contact)',
    shortDesc: 'Connects to COM when the relay is energized (ON).',
    detail: 'Form-A contact. Electrically disconnected at rest. When coil attracts armature, COM swings into firm electrical contact with NO, turning on the water pump.',
    color: '#10b981'
  },
  {
    id: 'contacts',
    name: 'Movable Contact & Tips',
    shortDesc: 'Silver-alloy contacts providing low contact resistance.',
    detail: 'Wiping contacts engineered to withstand inductive switching arcs and prevent micro-welding when starting electric pump motor inductive loads.',
    color: '#06b6d4'
  }
]

export const VIVA_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the main syllabus device in this project?',
    options: ['Arduino Uno', 'Electromechanical Relay', 'Water Flow Sensor', 'DC Water Pump'],
    correctIndex: 1,
    explanation: 'The Relay is the primary syllabus device under Unit IV & V (Sensors and Actuation Systems, Topic 18: Automatic Motor Switching Using a Relay).'
  },
  {
    id: 2,
    question: 'What is the primary purpose of the relay in this system?',
    options: [
      'To measure water volume and generate pulses',
      'To act as an electrically isolated switching interface for the pump circuit',
      'To convert analog signals to digital values',
      'To step up the 5V Arduino power to run the pump'
    ],
    correctIndex: 1,
    explanation: 'The relay provides galvanic isolation and allows low-power Arduino digital logic (5V, ~20mA) to safely switch higher-current pump loads.'
  },
  {
    id: 3,
    question: 'What does the water flow sensor provide to the Arduino microcontroller?',
    options: [
      'An analog resistance proportional to water height',
      'Flow-related digital voltage pulses from a Hall-effect sensor',
      'Direct 230V AC switching commands',
      'Soil moisture percentage'
    ],
    correctIndex: 1,
    explanation: 'As water flows, a pinwheel rotor with an embedded magnet spins past a Hall-effect sensor, generating digital square-wave pulses.'
  },
  {
    id: 4,
    question: 'What occurs when the preset water quantity limit is reached?',
    options: [
      'The flow sensor mechanically jams the pipe',
      'Arduino changes the relay control pin state, de-energizing the relay and cutting pump power',
      'The Arduino turns off its own power supply',
      'The pump reverses its rotational direction'
    ],
    correctIndex: 1,
    explanation: 'Arduino monitors the accumulated pulse count. Upon meeting the target, it changes the relay digital output pin, breaking the pump contact circuit.'
  },
  {
    id: 5,
    question: 'What is the definition of the COM terminal on a relay module?',
    options: [
      'Common ground for all electrical grounds',
      'Common terminal connected to the movable contact arm',
      'Communication pin for SPI/I2C serial protocol',
      'Comparator output terminal'
    ],
    correctIndex: 1,
    explanation: 'COM is the Common electrical terminal connected directly to the movable contact armature arm that flips between NC and NO.'
  },
  {
    id: 6,
    question: 'What does NO (Normally Open) mean in relay contact configuration?',
    options: [
      'The circuit is normally closed when unpowered',
      'The contact remains open (disconnected from COM) when the coil is de-energized',
      'It cannot be turned off once activated',
      'No output voltage is ever allowed'
    ],
    correctIndex: 1,
    explanation: 'Normally Open (NO) contacts remain disconnected from COM at rest. When coil current activates the electromagnet, the contact closes.'
  },
  {
    id: 7,
    question: 'What is the function of the NC (Normally Closed) contact?',
    options: [
      'Connects to COM when coil is at rest, and breaks when energized',
      'Non-conducting contact used only as a test point',
      'Short-circuits the Arduino in emergency stops',
      'Connects only when coil temperature exceeds 50°C'
    ],
    correctIndex: 0,
    explanation: 'NC provides continuity to COM when no current passes through the coil. Energizing the coil pulls the armature away, opening the NC circuit.'
  },
  {
    id: 8,
    question: 'Does the water flow sensor measure water level or depth in a tank?',
    options: [
      'Yes, by measuring hydrostatic pressure head',
      'Yes, using ultrasonic echo reflections',
      'No. It measures fluid flow velocity and volume through the pipe, not level or depth',
      'Yes, it detects capacitive water dielectric constant'
    ],
    correctIndex: 2,
    explanation: 'Water flow sensors measure dynamic fluid transit through a pipe (velocity/volume). They do not measure static tank water level or depth.'
  },
  {
    id: 9,
    question: 'Why is calibration essential in a pulse-based flow measurement system?',
    options: [
      'To prevent the Arduino microcontroller from overheating',
      'To accurately relate sensor pulse frequency/count to actual volume (e.g., pulses per litre)',
      'To synchronize the AC mains frequency with DC logic',
      'To make the relay coil switch without friction'
    ],
    correctIndex: 1,
    explanation: 'Mechanical rotor geometry and fluid dynamics dictate pulses generated per unit volume. Calibration maps raw pulse counts to exact millilitres or litres.'
  },
  {
    id: 10,
    question: 'In the system architecture hierarchy, correctly map: Flow Sensor, Arduino Uno, Relay Module, DC Pump:',
    options: [
      'Sensor → Controller → Main Switching Interface → Actuator / Load',
      'Actuator → Sensor → Controller → Power Supply',
      'Controller → Sensor → Load → Relay',
      'Main Device → Supporting Device → Load → Controller'
    ],
    correctIndex: 0,
    explanation: 'Flow Sensor is the Input Sensor; Arduino Uno is the Controller; Relay is the Main Switching Interface; DC Water Pump is the Actuator/Load.'
  }
]

export const TEN_STEP_PROCESS = [
  { step: 1, title: 'Target Preset & Pump Initialization', desc: 'Predefined quantity is set and user or system initiates pump operation via Arduino.' },
  { step: 2, title: 'Relay Energization (COM → NO)', desc: 'Arduino sets control pin to energize relay coil, closing NO contact and powering the DC pump.' },
  { step: 3, title: 'Fluid Motion in Pipe', desc: 'DC pump draws fluid and drives water through tubing into the flow chamber.' },
  { step: 4, title: 'Rotor Rotation via Fluid Velocity', desc: 'Pressurized water spins the internal pinwheel rotor with embedded permanent magnet.' },
  { step: 5, title: 'Hall-Effect Pulse Generation', desc: 'Magnetic field passage induces discrete digital square-wave pulses from the Hall sensor.' },
  { step: 6, title: 'Arduino Interrupt Pulse Acquisition', desc: 'Arduino hardware interrupt pin (e.g. Pin 2) increments high-speed pulse counter.' },
  { step: 7, title: 'Real-Time Volume Integration', desc: 'Software converts pulses to delivered volume: Volume = Pulses ÷ Calibration Factor.' },
  { step: 8, title: 'Target Threshold Evaluation', desc: 'Arduino compares delivered volume against preset target on each program cycle.' },
  { step: 9, title: 'Relay De-Energization Signal', desc: 'Once target is met, Arduino de-asserts control pin, releasing electromagnetic coil.' },
  { step: 10, title: 'Return Spring Action & Flow Cutoff', desc: 'Spring snaps armature back to NC resting state, isolating pump power and stopping water flow.' },
]
