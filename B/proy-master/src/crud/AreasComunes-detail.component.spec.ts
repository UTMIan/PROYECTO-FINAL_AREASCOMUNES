import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AreasComunesDetailComponent} from './AreasComunes-detail.component';
 
describe('AreasComunesDetailComponent', () => {
  let component: AreasComunesDetailComponent;
  let fixture: ComponentFixture<AreasComunesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreasComunesDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreasComunesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});