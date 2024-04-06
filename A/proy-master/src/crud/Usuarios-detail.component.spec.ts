import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuariosDetailComponent} from './Usuarios-detail.component';
 
describe('UsuariosDetailComponent', () => {
  let component: UsuariosDetailComponent;
  let fixture: ComponentFixture<UsuariosDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});