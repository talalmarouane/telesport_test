import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestOlympicComponent } from './test-olympic.component';
import { OlympicService } from '../../core/services/olympic';

describe('TestOlympicComponent', () => {
  let component: TestOlympicComponent;
  let fixture: ComponentFixture<TestOlympicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestOlympicComponent, HttpClientTestingModule],
      providers: [OlympicService]
    }).compileComponents();

    fixture = TestBed.createComponent(TestOlympicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
