class SensorDataGenerator {
  private readonly sensorId: string;

  constructor(sensorId: string) {
    this.sensorId = sensorId;
  }

  private generateRandomTemperature(): number {
    return Math.floor(Math.random() * 100);
  }

  private generateRandomHumidity(): number {
    return Math.floor(Math.random() * 100);
  }

  public generateRandomData(): string {
    const temperature = this.generateRandomTemperature();
    const humidity = this.generateRandomHumidity();
    return `${this.sensorId}: Temperature: ${temperature}°C, Humidity: ${humidity}%`;
  }
}

export { SensorDataGenerator };
