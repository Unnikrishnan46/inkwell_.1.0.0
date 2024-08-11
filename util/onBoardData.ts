import {AnimationObject} from 'lottie-react-native';

export interface OnboardingData {
  id: string;
  animation: AnimationObject;
  text: string;
  textColor: string;
  backgroundColor: string;
  bodyText:string;
}

const data: OnboardingData[] = [
  {
    id: "1",
    animation: require("./../assets/animations/Lottie1.json"),
    text: 'Turn your memories into diary',
    textColor: '#005b4f',
    backgroundColor: '#ffdbdb',
    bodyText:"Write down your special memories into a diary with photos and voice notes attached"
  },
  {
    id: "2",
    animation: require("./../assets/animations/Lottie4.json"),
    text: 'Your memories are safe here',
    textColor: '#1e2169',
    backgroundColor: '#ffcea5',
    bodyText:"Your special memories can be guarded by setting up biometric credentials and passcode"
  },
  {
    id: "3",
    animation:require("./../assets/animations/Lottie8.json"),
    text: 'Never lose your data',
    textColor: '#F15937',
    backgroundColor: '#fff9d4',
    bodyText:"You can backup and restore your entries anytime you want"
  },
  {
    id: "4",
    animation:require("./../assets/animations/Lottie9.json"),
    text: 'Reminder',
    textColor: '#F15937',
    backgroundColor: '#d2fafd',
    bodyText:"You can set up a reminder so that you can be notified about writing your diary everyday!"
  },
];

export default data;