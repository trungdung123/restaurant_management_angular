import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdminUpdateMenuItemComponent } from './modal-admin-update-menu-item.component';

describe('ModalAdminUpdateMenuItemComponent', () => {
  let component: ModalAdminUpdateMenuItemComponent;
  let fixture: ComponentFixture<ModalAdminUpdateMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAdminUpdateMenuItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAdminUpdateMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
