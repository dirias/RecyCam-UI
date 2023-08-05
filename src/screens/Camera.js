import React from 'react';
import { SafeAreaView } from 'react-native';
import CapturePhoto from "../components/CapturePhoto";

export default function Camera() {
  return (
    <SafeAreaView>
      <CapturePhoto />
    </SafeAreaView>
  );
}
