import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioFormularioComponent } from './horario-formulario-component';

describe('HorarioFormularioComponent', () => {
  let component: HorarioFormularioComponent;
  let fixture: ComponentFixture<HorarioFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorarioFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorarioFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
