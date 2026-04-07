// lib/userAttributes.ts
import { gql } from "@apollo/client";

export enum DeviceType {
  DESKTOP = "DESKTOP",
  LAPTOP = "LAPTOP",
  TABLET = "TABLET",
  PHONE = "PHONE",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export type UserAttributes = {
  id: string;
  yearGroup: number;
  sleepHours: number;
  deviceType: DeviceType;
  gender: Gender;
  timestamp: string;
};

export const FIND_BY_DEVICE_TYPE = gql`
  query FindByDeviceType($deviceType: DeviceType!) {
    findByDeviceType(deviceType: $deviceType) {
      id
      yearGroup
      sleepHours
      deviceType
      gender
      timestamp
    }
  }
`;

export const FIND_BY_YEAR_GROUP = gql`
  query FindByYearGroup($yearGroup: Int!) {
    findByYearGroup(yearGroup: $yearGroup) {
      id
      yearGroup
      sleepHours
      deviceType
      gender
      timestamp
    }
  }
`;

export const FIND_BY_GENDER = gql`
  query FindByGender($gender: Gender!) {
    findByGender(gender: $gender) {
      id
      yearGroup
      sleepHours
      deviceType
      gender
      timestamp
    }
  }
`;

export const FIND_BY_SLEEP_HOURS = gql`
  query FindBySleepHours($sleepHours: Float!) {
    findBySleepHours(sleepHours: $sleepHours) {
      id
      yearGroup
      sleepHours
      deviceType
      gender
      timestamp
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($input: AddUserInput!) {
    addUser(input: $input) {
      id
      yearGroup
      sleepHours
      deviceType
      gender
      timestamp
    }
  }
`;